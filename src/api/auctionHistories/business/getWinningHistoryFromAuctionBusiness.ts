import { Request } from 'express';
import _ from 'lodash';
import { getWinningHistoryFromAuctionWithAuctionId } from '../database';
import { AppError } from '../../../shared/utils';

/**
 * Get history with the highest bidding price of an auction.
 *
 * @export
 * @param {Request} req
 * @return {Promise<AuctionHistories>}
 */
export async function getWinningHistoryFromAuctionBusiness(req: Request) {
  const { auctionId } = req.query;
  const history = await getWinningHistoryFromAuctionWithAuctionId(
    _.toString(auctionId),
  );
  if (!history) {
    throw new AppError('There is no history from this auction', 500, true);
  }
  console.log(history);
  return history;
}
