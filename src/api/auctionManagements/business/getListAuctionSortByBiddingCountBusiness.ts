import { Request } from 'express';
import _ from 'lodash';
import { defaultLimit } from '../../../shared/helpers/constant';
import { AppError } from '../../../shared/utils';
import { getAuctionsSortByBiddingCount } from '../database';

/**
 * Business for getting auctions sort by highest bidding count.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getListAuctionSortByBiddingCountBusiness(req: Request) {
  const max = _.get(req, 'query.max', defaultLimit.MAX);
  const auction = await getAuctionsSortByBiddingCount(max);
  if (!auction) {
    throw new AppError(
      'Cannot get list of Auctions sort by bidding count',
      500,
      true,
    );
  }
  return auction;
}
