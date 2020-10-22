import { Transaction } from 'sequelize/types';
import { AuctionManagements } from '../../../database/models';

/**
 * Query for creating new auction.
 *
 * @export
 * @param {AuctionManagements} auction
 * @param {Transaction} transaction
 * @return {Promise<AuctionManagements>}
 */
export async function createAuction(
  sellerId: string,
  productId: string,
  description: string,
  endAt: Date,
  transaction: Transaction,
) {
  return AuctionManagements.create(
    {
      sellerId,
      productId,
      description,
      createdBy: sellerId,
      updatedBy: sellerId,
      endAt,
    },
    { transaction },
  );
}
