import { sequelize } from '../../../database/sequelize';
import { safeParseInt } from '../../../shared/helpers';
import { defaultLimit } from '../../../shared/helpers/constant';

/**
 * Query for getting auctions which has the highest bidding count.
 * Order by the highest bidding count.
 * Auction must not end.
 *
 * @export
 * @param {number} option - number of auctions you want to get.
 * @return {*}
 */
export async function getAuctionsSortByBiddingCount(option: number) {
  return sequelize.query(
    'select * \n' +
      'from (select product_id, count, end_at from auctionDB.auction_managements as auct inner join\n' +
      '\t(select auction_id, count(auction_id) as count \n' +
      '\t\tfrom auctionDB.auction_histories \n' +
      '        group by auction_id ) as maxcount\n' +
      '\ton auct.id like maxcount.auction_id) as data \n' +
      'join auctionDB.products as products \n' +
      'where data.product_id like products.id and end_at>=curdate()\n' +
      'order by count desc\n' +
      `limit ${safeParseInt(option, defaultLimit.MAX)};`,
    {
      raw: true,
    },
  );
}
