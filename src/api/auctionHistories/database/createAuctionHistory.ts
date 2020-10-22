import { Transaction } from 'sequelize/types';
import { AuctionHistories } from '../../../database/models';

/**
 * Query for creating auction history.
 *
 * @export
 * @param {string} userId - id of user who bid.
 * @param {string} auctionId - id of bidden auction
 * @param {number} price - bidden price.
 * @param {Transaction} t
 * @return {Promise<AuctionHistories>}
 */
export async function createAuctionHistory(
  userId: string,
  auctionId: string,
  price: number,

  t: Transaction,
) {
  return AuctionHistories.create(
    {
      userId,
      auctionId,
      price,
      createdBy: userId,
      updatedBy: userId,
    },
    {
      transaction: t,
    },
  );
}
