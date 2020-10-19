import _ from 'lodash';
import { Op } from 'sequelize';
import { AuctionManagements, Products } from '../../../database/models';

/**
 * Query for getting an auction by Id.
 * 'auction_managements' join with 'products'.
 * Auction must not end.
 *
 * @export
 * @param {string} id - auction id.
 * @return {Promise<AuctionManagements>}
 */
export async function getAuctionById(
  id: string,
): Promise<AuctionManagements | null> {
  const auctions = await AuctionManagements.findOne({
    include: [
      {
        model: Products,
        as: 'products',
      },
    ],
    where: {
      endAt: {
        [Op.gt]: _.now(),
      },
      id,
    },
  });
  return auctions;
}
