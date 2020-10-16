import _ from 'lodash';
import { Op } from 'sequelize/types';
import { AuctionManagements, Products } from '../../../database/models';
import { pagination } from '../../../shared/helpers';

/**
 * Query for getting all auctions.
 * 'auction_managements' join with 'products'.
 * Auctions must not end.
 *
 * @export
 * @param {number} page - index of page.
 * @param {number} pagesize - size of page.
 * @return {*}
 */
export async function getAllAuctions(page: number, pagesize: number) {
  const { offset, limit } = pagination(page, pagesize);
  const auctions = await AuctionManagements.findAll({
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
    },
    order: [['endAt', 'ASC']],
    limit,
    offset,
  });
  return auctions;
}
