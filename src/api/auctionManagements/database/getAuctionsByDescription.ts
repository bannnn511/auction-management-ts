import { Sequelize } from 'sequelize-typescript';
import { AuctionManagements, Products } from '../../../database/models';

/**
 * Query for getting auctions by its description field.
 * Using Full Text Search in natural language mode.
 * Join 'auction_managements' and 'products'.
 *
 * @export
 * @param {string} description - auction description.
 * @return {*}
 */
export async function getAuctionsByDescription(description: string) {
  return AuctionManagements.findAll({
    include: [{ model: Products, as: 'products' }],
    where: Sequelize.literal(
      `MATCH (description) AGAINST ('${description}' IN NATURAL LANGUAGE MODE)`,
    ),
  });
}
