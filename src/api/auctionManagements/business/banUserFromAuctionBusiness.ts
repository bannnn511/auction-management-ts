import { Request } from 'express';
import _ from 'lodash';
import { AppError, Email } from '../../../shared/utils';
import { banUserFromAuctions } from '../../auctionParticipating/database';
import { getUserById } from '../../buyers/database';
import { getAuctionById } from '../database';

/**
 * Seller can ban a user from theirs auction.
 * Send email to banned user.
 *
 * @export
 * @param {Request} req
 * @return {*>}
 */
export async function banUserFromAuctionBusiness(req: Request) {
  const { id } = req.params;
  const sellerId = _.get(req, 'currentUser.id', '');
  req.body.createdBy = sellerId;
  req.body.updatedBy = sellerId;
  req.body.auctionId = id;

  // check if currentUser is the seller of this auction
  const checkAuction = await getAuctionById(id);
  if (checkAuction?.sellerId !== sellerId) {
    throw new AppError(
      'You are not the seller who create this auction',
      500,
      true,
    );
  }

  // ban user
  const data = await banUserFromAuctions(req.body);
  if (!data) {
    throw new AppError('Cannot ban user', 500, true);
  }

  // send email to the user who have been banned
  const user = await getUserById(data.userId);
  const myEmail = _.defaultTo(process.env.MY_EMAIL, '');
  const clientEmail = _.get(user, 'email', '');
  const email = new Email(
    myEmail,
    clientEmail,
    'Ban from auction',
    `You have been banned from this auction ${data.auctionId}`,
  );
  email.send();
  return user;
}
