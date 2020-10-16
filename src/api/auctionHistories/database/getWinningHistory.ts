import { AuctionHistories, AuctionManagements } from '../../../database/models';
import { sequelize } from '../../../database/sequelize';

/**
 * Query to get highest bidding price.
 * Join 'auction_history' and 'auction_managements' tables.
 *
 * @export
 * @param {string} auctionId
 * @return {Promise<AuctionHistories>}
 */
export async function getWinningHistoryFromAuctionWithAuctionId(
  auctionId: string,
) {
  return AuctionHistories.findOne({
    include: [
      {
        model: AuctionManagements,
      },
    ],
    attributes: [
      [
        sequelize.Sequelize.fn('MAX', sequelize.Sequelize.col('price')),
        'price',
      ],
      ['user_id', 'userId'],
    ],
    where: {
      auctionId,
    },
    group: ['user_id', 'auction_id'],
    raw: true, 
  });
}
