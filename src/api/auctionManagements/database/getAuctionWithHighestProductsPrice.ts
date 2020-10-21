import { Op } from 'sequelize';
import _ from 'lodash';
import { AuctionManagements, Products } from '../../../database/models';
import { safeParseInt } from '../../../shared/helpers';
import { defaultLimit } from '../../../shared/helpers/constant';

/**
 * Query for getting auctions with the highest products price.
 * 'auction_managements' join with 'products'.
 * Auctions must not end.
 *
 * @export
 * @param {number} option - number of auctions you want to get.
 * @return {Promise<AuctionManagements[]>}
 */
export async function getAuctionsWithHighestProductsPrice(option: number) {
  return AuctionManagements.findAll({
    include: [{ model: Products, as: 'products' }],
    order: [[{ model: Products, as: 'products' }, 'currentPrice', 'DESC']],
    limit: safeParseInt(option, defaultLimit.MAX),
    where: {
      endAt: {
        [Op.gt]: _.now(),
      },
    },
  });
}
