import { Transaction } from 'sequelize/types';
import { HistoryObject } from '../../../shared/models/historyObject';
import { AuctionHistories } from '../../../database/models';

/**
 * Query for creating auction history.
 *
 * @export
 * @param {HistoryObject} body
 * @param {Transaction} t
 * @return {Promise<AuctionHistories>}
 */
export async function createAuctionHistory(
  body: HistoryObject,
  t: Transaction,
) {
  return AuctionHistories.create(
    {
      userId: body.userId,
      auctionId: body.auctionId,
      price: body.price,
      createdBy: body.createdBy,
      updatedBy: body.updatedBy,
    },
    {
      transaction: t,
    },
  );
}
