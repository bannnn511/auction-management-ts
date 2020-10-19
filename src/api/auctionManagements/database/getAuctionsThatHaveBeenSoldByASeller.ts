import { Op } from 'sequelize';
import { AuctionManagements, Products } from '../../../database/models';
import { pagination } from '../../../shared';

/**
 * Query for getting auction which have been sold by a seller.
 * buyerId in 'auction_managements' should not be null.
 *
 * @export
 * @param {number} page - index of page
 * @param {number} pagesize - page size
 * @param {string} sellerId - id of seller.
 * @return {*}
 */
export async function getAuctionSoldBySellerBusiness(
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
      buyerId: {
        [Op.not]: null,
      },
    },
    offset,
    limit,
  });
}
