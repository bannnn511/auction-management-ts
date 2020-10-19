import { Transaction } from 'sequelize/types';
import { AuctionManagements } from '../../../database/models';

/**
 * Query for creating new auction.
 * Transaction for ACID.
 *
 * @export
 * @param {AuctionManagements} auction
 * @param {Transaction} transaction
 * @return {*}
 */
export async function createAuction(
  auction: AuctionManagements,
  transaction: Transaction,
) {
  return AuctionManagements.create(
    {
      sellerId: auction.sellerId,
      productId: auction.productId,
      description: auction.description,
      createdBy: auction.createdBy,
      updatedBy: auction.updatedBy,
      endAt: auction.endAt,
    },
    { transaction },
  );
}
