import _ from 'lodash';
import { Op } from 'sequelize/types';
import { AuctionManagements, Products } from '../../../database/models';

/**
 * Query for getting an auction by Id.
 * 'auction_managements' join with 'products'.
 * Auction must not end.
 *
 * @export
 * @param {string} id - auction id.
 * @return {*}
 */
export async function getAuctionById(id: string) {
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
