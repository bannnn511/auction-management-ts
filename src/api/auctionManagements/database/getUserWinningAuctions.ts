// import _ from 'lodash';
// import { Op } from 'sequelize';
import { AuctionManagements, Buyers } from '../../../database/models';

/**
 * Query for getting all winning auctions of an user.
 *
 * @export
 * @param {string} id - user id
 * @return {*}
 */
export async function getUserWinningAuctions(id: string) {
  // return sequelize.query(
  //   `select * from auctionDB.auction_managements as auction, auctionDB.buyers as buyers where buyers.id= '${id}' and buyers.id = auction.buyer_id`,
  //   {
  //     raw: true,
  //   },
  // );

  return AuctionManagements.findAll({
    include: [
      {
        model: Buyers,
        as: 'buyers',
      },
    ],
    where: {
      buyerId: id,
    },
  });
}
