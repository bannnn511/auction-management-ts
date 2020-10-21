import _ from 'lodash';
import { Op } from 'sequelize';
import { AuctionManagements, Products } from '../../../database/models';
import { safeParseInt } from '../../../shared/helpers';
import { defaultLimit } from '../../../shared/helpers/constant';

/**
 * Query for getting auctions that are about to end.
 * 'auction_managements' join with 'products'.
 *
 * @export
 * @param {number} option - number of auctions you want to get.
 * @return {Promise<AuctionManagements[]>}
 */
export async function getAuctionsSortByRemainingTime(option: number) {
  return AuctionManagements.findAll({
    include: [{ model: Products, as: 'products' }],
    where: {
      endAt: {
        [Op.gt]: _.now(),
      },
    },
    limit: safeParseInt(option, defaultLimit.MAX),
    order: [['end_at', 'DESC']],
  });
}
