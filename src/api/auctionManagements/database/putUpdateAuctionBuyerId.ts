import { AuctionManagements } from '../../../database/models';

/**
 * Query for user won an auction.
 * Updating field 'buyer_id' in 'auction_managements'.
 * Update 'buyer_id' when auction ended, and 'buyer_id' is the id of the user who has the highest bid.
 *
 * @export
 * @param {string} buyerId - user id of the one who one the auction.
 * @param {string} productId - product id
 * @param {string} auctionId - auctionId
 * @return {Promise<AuctionManagements>}
 */

export async function updateAuctionBuyerId(
  buyerId: string,
  productId: string,
  auctionId: string,
) {
  await AuctionManagements.update(
    { buyerId },
    {
      where: {
        productId,
      },
    },
  );
  return AuctionManagements.findOne({
    where: {
      id: auctionId,
    },
  });
}
