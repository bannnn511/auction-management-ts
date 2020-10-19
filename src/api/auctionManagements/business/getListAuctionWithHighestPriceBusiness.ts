import { Request } from 'express';
import _ from 'lodash';
import { defaultLimit } from '../../../shared/helpers/constant';
import { AppError } from '../../../shared/utils';
import { getAuctionsWithHighestProductsPrice } from '../database';

/**
 * Business for getting auctions with hight prices.
 *
 * @export
 * @param {Request} req
 * @return {*} 
 */
export async function getListAuctionsWithHighestPriceBusiness(req: Request) {
  const max = _.get(req, 'query.max', defaultLimit.MAX);
  const auctions = await getAuctionsWithHighestProductsPrice(max);
  if (!auctions) {
    throw new AppError('Cannot get Auction list', 204, true);
  }
  return auctions;
}
