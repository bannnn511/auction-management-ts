import { Request } from 'express';
import _ from 'lodash';
import { getAuctionSoldBySellerBusiness } from '../database';
import { AppError } from '../../../shared/utils';

/**
 * Business for getting auctions that have been sold of a seller.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getAuctionsSoldOnMarketOfASellerBusiness(req: Request) {
  const id = _.get(req, 'currentUser.id', '');
  const page = _.get(req, 'query.page', 0);
  const pagesize = _.get(req, 'query.pagesize', 0);
  const data = await getAuctionSoldBySellerBusiness(page, pagesize, id);
  if (!data) {
    throw new AppError(
      'This seller is not selling anything on market',
      500,
      true,
    );
  }
  return data;
}
