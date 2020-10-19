import { Request } from 'express';
import { AppError } from '../../../shared/utils';
import { getAuctionById } from '../database';

/**
 * Business for get auction base on its id.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getAuctionByIdBusiness(req: Request) {
  const { id } = req.params;
  const auctions = await getAuctionById(id);
  if (!auctions) {
    throw new AppError('Cannot get Auction list', 500, true);
  }
  return auctions;
}
