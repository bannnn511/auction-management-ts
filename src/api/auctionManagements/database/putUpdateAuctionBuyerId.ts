import { AuctionManagements } from '../../../database/models';

/**
 * Query for updating field 'buyer_id' in 'auction_managements'.
 * Update 'buyer_id' when auction ended, and 'buyer_id' is the id of the user who has the highest bid.
 *
 * @export
 * @param {*} data
 * @return {*}
 */

// Todo: update type for data parameter.
export async function updateAuctionBuyerId(data: any) {
  await AuctionManagements.update(
    { buyerId: data.userId },
    {
      where: {
        productId: data.productId,
      },
    },
  );
  return AuctionManagements.findOne({
    where: {
      id: data.auctionId,
    },
  });
}
