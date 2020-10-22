import { Request } from 'express';
import _ from 'lodash';
import cron from 'node-cron';
import { Socket } from 'socket.io';
import { sequelize } from '../../../database/sequelize';
import { toDateString } from '../../../shared';
import { AppError, Email } from '../../../shared/utils';
import { getWinningHistoryFromAuctionWithAuctionId } from '../../auctionHistories/database';
import {
  updateAuctionBuyerId,
  createAuction,
  getBuyersParticipatedInAnAuction,
} from '../../auctionManagements/database';
import { getCategoryId } from '../../categories/database';
import { addProductToCategory } from '../../categoriesManagement/database';
import { createNotification } from '../../notification/database';
import { createProduct, getProductWithId } from '../database';
import { getFavoritesWithCategoryId } from '../../favorites/database/getFavoritesWithCategoryId';

/**
 * Sends an email to announced that the auctions has ended.
 *
 * @param {string} auctionId - Id of the ended auction.
 */
async function sendEmail(auctionId: string) {
  const userData = await getBuyersParticipatedInAnAuction(auctionId);
  const emailData: string[] = [];
  userData.forEach((data: any) => {
    emailData.push(data.email);
  });

  const email = new Email(
    _.toString(process.env.MY_EMAIL),
    emailData,
    'Auction ended',
    `Auction with id: ${auctionId} that you have been participated had ended`,
  );
  email.send();
}

/**
 * Updates buyerId in AuctionManagements table to whom has won the auction.
 *
 * @param {string} auctionId - Id of the ended auction.
 * @param {string} productId - Id of the product in this auction.
 * @return {Object} - updated info of the ended auction.
 */
async function onAuctionEnded(auctionId: string, productId: string) {
  const winningData = await getWinningHistoryFromAuctionWithAuctionId(
    auctionId,
  );
  if (!winningData) {
    throw new AppError('There is no winning data', 500, true);
  }

  const updatedAuction = await updateAuctionBuyerId(
    winningData.userId,
    productId,
    auctionId,
  );
  if (!updatedAuction) {
    throw new AppError('Cannot update winning Buyer', 500, true);
  }

  return updatedAuction;
}

/**
 * Create a cronjob to check when auction ended.
 * If the auction ends, update the AuctionManagements table.
 *
 * @param {string} auctionId - id of the new auction.
 * @param {string} productId - id of the new product.
 * @param {Date} endAt - end date.
 */
async function createCronJobForAutoEndAuction(
  auctionId: string,
  productId: string,
  endAt: Date,
) {
  const task = cron.schedule('*/1 * * * *', async () => {
    const currentTime = new Date(_.now());
    const endDate = new Date(endAt);
    console.log('Current time:', toDateString(currentTime));
    console.log('End time:', toDateString(endAt));
    if (currentTime >= endDate) {
      console.log('🤖', 'Auction has ended');
      const auctionEnded = await onAuctionEnded(auctionId, productId);
      sendEmail(auctionEnded.id);
      task.destroy();
    }
  });
}

/**
 * Send notifications for new product in theirs favorite cateogry.
 *
 * @param {Socket} io - socket
 * @param {any[]} activeAuctions -
 * @param {string} categoryId - category id
 * @param {string} category - category title.
 */
async function sendNotificationForNewProductInCategory(
  io: Socket,
  activeAuctions: any[],
  categoryId: string,
  category: string,
) {
  const userId = await getFavoritesWithCategoryId(categoryId);
  const description = `There is a new product in your favorite category: ${category}`;
  userId.forEach((user: any) => {
    io.to(activeAuctions[user.userId]).emit('notification', description);
    createNotification(user.userId, description);
  });
}

/**
 * Create new product + auctions + cronjobs.
 * Need transaction to assure atomicity.
 *
 * @export
 * @param {Request} req - Request sent from clients.
 * @return {*}
 */
export async function createNewProductBusiness(req: Request) {
  const transaction = await sequelize.transaction();
  try {
    const userId = _.get(req, 'currentUser.id', '');
    req.body.createdBy = userId;
    req.body.updatedBy = userId;
    const { category, description, endAt } = req.body;

    if (new Date(endAt) < new Date(_.now())) {
      throw new AppError('End date must be in the future');
    }
    const product = await createProduct(req.body, transaction);
    if (!product) {
      throw new AppError('Cannot create product', 500, true);
    }

    const newAuction = await createAuction(
      userId,
      product.id,
      description,
      endAt,
      transaction,
    );
    if (!newAuction) {
      throw new AppError('Cannot start auction', 500, true);
    }

    // cronjob start here
    if (_.isDate(endAt)) {
      await createCronJobForAutoEndAuction(newAuction.id, product.id, endAt);
    }

    // send notification for user who favorite this category
    if (category) {
      const categoryId = await getCategoryId(category);
      if (!categoryId) {
        throw new AppError('This category does not exist', 500, true);
      }
      const io = req.app.get('socket');
      const data = await addProductToCategory(
        categoryId,
        product.id,
        userId,
        userId,
        transaction,
      );
      if (data) {
        io.emit('askForUserId');
        const activeAuctions = req.app.get('activeAuctions');
        sendNotificationForNewProductInCategory(
          io,
          activeAuctions,
          categoryId,
          category,
        );
      }
    }

    await transaction.commit();
    return await getProductWithId(product.id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
