import { Request } from 'express';
import _ from 'lodash';
import {
  getAllAuctions,
  getAuctionByProductName,
  getAuctionsByDescription,
} from '../database';
import { AppError } from '../../../shared/utils';

/**
 * Business for getting auctions.
 * If productname in request params, then get auctions base on productName.
 * If description in request params, then get auctions base on its description.
 * Get all auctions by default.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getAllAuctionsBusiness(req: Request) {
  const page = _.get(req, 'query.page', 0);
  const pagesize = _.get(req, 'query.pagesize', 0);
  const productname = _.get(req, 'query.productname', null);
  const description = _.get(req, 'query.description', null);

  // get auction base on productName
  if (productname) {
    const auctions = await getAuctionByProductName(productname);
    if (!auctions) {
      throw new AppError(
        `Cannot get Auction this this product: ${productname}`,
        500,
        true,
      );
    }
    return auctions;
  }

  // get auctions base on its description
  if (description) {
    const data = await getAuctionsByDescription(_.toString(description));
    if (!data) {
      throw new AppError(
        'Cannot find auctions with this description',
        500,
        true,
      );
    }
    return data;
  }

  // get all auctions
  const auctions = await getAllAuctions(page, pagesize);
  if (!auctions) {
    throw new AppError('Cannot get Auction list', 500, true);
  }
  return auctions;
}
