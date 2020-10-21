import _ from 'lodash';
import { Op } from 'sequelize';
import { AuctionManagements, Products } from '../../../database/models';
import { pagination } from '../../../shared/helpers';

/**
 * Query for getting auctions which is on market -> auction not ended.
 * buyerId in 'auction_managements' must be null.
 *
 * @export
 * @param {number} page - page index
 * @param {number} pagesize - page size
 * @param {string} sellerId - sellerId.
 * @return {Promise<AuctionManagements[]>}
 */
export async function getAuctionOnMarketOfASeller(
  page: number,
  pagesize: number,
  sellerId: string,
) {
  const { offset, limit } = pagination(page, pagesize);
  return AuctionManagements.findAll({
    include: [
      {
        model: Products,
        as: 'products',
      },
    ],
    where: {
      sellerId,
      buyerId: null,
      endAt: {
        [Op.gt]: _.now(),
      },
    },
    offset,
    limit,
  });
}
