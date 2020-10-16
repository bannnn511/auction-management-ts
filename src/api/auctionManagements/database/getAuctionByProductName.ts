import _ from 'lodash';
import { Op } from 'sequelize/types';
import { AuctionManagements, Products } from '../../../database/models';

/**
 * Query for getting an auction with product name.
 * 'auction_managements' join with 'products'.
 *
 * @export
 * @param {string} productName - The product name.
 * @return {*}
 */
export async function getAuctionByProductName(productName: string) {
  return AuctionManagements.findOne({
    include: [
      {
        model: Products,
        as: 'products',
        where: { productName },
      },
    ],
    where: {
      endAt: {
        [Op.gt]: _.now(),
      },
    },
  });
}
