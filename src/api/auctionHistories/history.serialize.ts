import * as _ from 'lodash';
import { safeParseInt } from '../../shared/helpers';

/**
 * Serialize data for 'auction_histories' from 'products' tables
 * and 'auction_managements' table
 *
 * @export
 * @param {Products} product
 * @param {AuctionManagements} auction
 * @return {*}
 */
export function serializeAuctionHistoryFromProductAndAuction(
  product: any,
  auction: any,
) {
  if (product && auction) {
    return {
      userId: _.get(product, 'updatedBy', ''),
      auctionId: _.get(auction, 'id', ''),
      price: safeParseInt(product.currentPrice, 0),
      createdBy: _.get(product, 'createdBy', ''),
      updatedBy: _.get(product, 'updatedBy', ''),
    };
  }
  return null;
}

/**
 * Serialize for auction_history join with auction_managements
 *
 * @export
 * @param {*} auction
 * @return {*}
 */
export function serializeAuctionHistory(auction: any) {
  if (auction) {
    return {
      auctionId: _.get(auction, 'auctions.id', ''),
      price: _.get(auction, 'price', 0),
      buyerId: _.get(auction, 'auctions.buyerId', ''),
      sellerId: _.get(auction, 'auctions.sellerId', ''),
      description: _.get(auction, 'auctions.description', 0),
      endAt: _.get(auction, 'auctions.endAt', ''),
    };
  }
  return null;
}
