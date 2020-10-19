import { Request } from 'express';
import _ from 'lodash';
import { defaultLimit } from '../../../shared/helpers/constant';
import { AppError } from '../../../shared/utils';
import { getAuctionsSortByRemainingTime } from '../database';

/**
 * Business for getting auctions sort by remaining time until that auctions end.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getListAuctionsSortByRemainTimeBusiness(req: Request) {
  const max = _.get(req, 'query.max', defaultLimit.MAX);
  const auctions = await getAuctionsSortByRemainingTime(max);
  if (!auctions) {
    throw new AppError(
      'Cannot get list of Auctions sort by remaining time',
      500,
      true,
    );
  }
  return auctions;
}
