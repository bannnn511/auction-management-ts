import { AuctionManagements } from '../../../database/models';

/**
 * Query for getting an auction by product id.
 *
 * @export
 * @param {string} productId - productId
 * @return {*}
 */
export async function getAuctionWithProductId(productId: string) {
  return AuctionManagements.findOne({
    where: {
      productId,
    },
  });
}
