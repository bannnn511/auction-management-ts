import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import { getUserWinningAuctions } from '../database';

/**
 * Business for getting winning auctions of an user.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getAUserWinningAuctionBusiness(req: Request) {
  const id = _.get(req, 'currentUser.id', '');
  const data = await getUserWinningAuctions(id);
  console.log(data);
  if (!data) {
    throw new AppError('This Buyer has not won any auction', 500, true);
  }
  return data;
}
