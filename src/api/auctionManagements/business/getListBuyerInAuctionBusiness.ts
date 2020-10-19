import { Request } from 'express';
import { AppError } from '../../../shared/utils';
import { getAllBuyersInAuction } from '../database';

/**
 * Business for getting buyers in an auction.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getListBuyersInAuctionBusiness(req: Request) {
  const { id } = req.params;
  const buyers = await getAllBuyersInAuction(id);
  if (!buyers) {
    throw new AppError('Cannot get list buyer', 500, true);
  }
  return buyers;
}
