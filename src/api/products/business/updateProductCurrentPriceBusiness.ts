import { Request } from 'express';
import _ from 'lodash';
import { getProductWithId } from '../database';
import { AppError, Email } from '../../../shared/utils';
import { UserBanStatus } from '../../../shared';
import { createAuctionHistory } from '../../auctionHistories/database';
import { getAuctionWithProductId } from '../../auctionManagements/database';
import { getUserBanStatusFromAuctions } from '../../auctionParticipating/database/getBannedUserFromAuction';
import { updateProductPrice } from '../database/updateProductPrice';
import { sequelize } from '../../../database/sequelize';
import {
  checkUserParticipateAuction,
  userParticipateAuctions,
} from '../../auctionParticipating/database';

/**
 * Send email.
 *
 * @param {string} userEmail - users email
 */
function sendEmailAfterBidSuccessfully(userEmail: string) {
  const email = new Email(
    _.toString(process.env.MY_EMAIL),
    userEmail,
    'Bidding Succeed',
    'You have bidden this auction successfully',
  );
  email.send();
}

/**
 * Request body
 * @typedef {Object} Body
 * @property {string} id - Product id
 * @property {string} price - Bidding price from request
 * @property {string} updatedBy - Buyer Id from client
 */

/**
 * Check bidding requirements.
 * Check product exists.
 * Check auction exists.
 * Check user ban status.
 * Check bidding price if it is higher than current price.
 * Check if auction ended.
 *
 * @param {string} id - product Id
 * @param {Body} body - data from request
 * @return {Object} - auction data
 */
async function checkBiddingCondition(body: any) {
  // check products exist
  const checkProduct = await getProductWithId(body.id);
  if (!checkProduct) {
    return new AppError('Product does not exist', 500, true);
  }

  // check auction exist
  const auction = await getAuctionWithProductId(body.id);
  if (!auction) {
    return new AppError('There is no auction with this product', 500, true);
  }

  // check ban status
  const status = await getUserBanStatusFromAuctions(auction.id, body.updatedBy);
  if (status === UserBanStatus.BAN) {
    return new AppError('You have been banned from this auction', 500, true);
  }

  // check price valid
  if (checkProduct.currentPrice >= body.price) {
    return new AppError(
      'Bidding price must be higher than current price',
      500,
      true,
    );
  }

  // check if bidding time is till valid
  if (auction.endAt <= new Date(_.now())) {
    return new AppError('Bidding time has expired', 500, true);
  }

  return auction;
}

/**
 * Create new data in AuctionParticipate table.
 *
 * @param {*} data
 */
async function addUserParticipateAuction(userId: string, auctionId: string) {
  const payload = await checkUserParticipateAuction(userId, auctionId);
  if (!payload) {
    const participate = await userParticipateAuctions(userId, auctionId);
    if (!participate) {
      throw new AppError('Cannot add user participate auction', 500, true);
    }
  }
}

/**
 * Update product price.
 * Create bidding history.
 * Send email.
 * Add user participated.
 * Socket emit event for real-time update.
 *
 * @export
 * @param {Request} req - data request from clients
 */
export async function updateProductCurrentPriceBusiness(req: Request) {
  const io = req.app.get('socket');
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { body } = req;
    const userId = _.get(req, 'currentUser.id', '');
    const email = _.get(req, 'currentUser.email', '');

    body.updatedBy = userId;
    body.id = id;

    const auction = await checkBiddingCondition(body);
    if (auction instanceof Error) {
      throw auction;
    }

    const newProduct = await updateProductPrice(body, transaction);
    if (!newProduct) {
      throw new AppError('Cannot create Auction History', 500, true);
    }

    const history = await createAuctionHistory(
      userId,
      auction.id,
      body.price,
      transaction,
    );
    if (!history) {
      throw new AppError('Cannot create Auction History', 500, true);
    }

    // check if user had participate auction if not create.
    addUserParticipateAuction(userId, auction.id);
    await transaction.commit();
    const returnData = await getProductWithId(newProduct.id);

    // emit event for real time data
    io.emit('broadcast', returnData);

    // send email after transaction commit succeed
    sendEmailAfterBidSuccessfully(email);
    return returnData;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
