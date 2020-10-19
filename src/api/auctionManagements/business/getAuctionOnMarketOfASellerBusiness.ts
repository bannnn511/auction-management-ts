import { Request } from 'express';
import _ from 'lodash';
import { getAuctionOnMarketOfASeller } from '../database';
import { AppError } from '../../../shared/utils';

/**
 * Business for get auctions on market of a seller.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getAuctionsOnMarketOfASellerBusiness(req: Request) {
  const id = _.get(req, 'currentUser.id');
  const page = _.get(req, 'query.page', 0);
  const pagesize = _.get(req, 'query.pagesize', 0);

  const data = await getAuctionOnMarketOfASeller(page, pagesize, id);
  if (!data) {
    throw new AppError(
      'This seller is not selling anything on market',
      500,
      true,
    );
  }
  return data;
}
