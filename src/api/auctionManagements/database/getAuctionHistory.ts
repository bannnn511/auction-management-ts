import { sequelize } from '../../../database/sequelize';

/**
 * Query for getting all buyers who have participated in an auction.
 * Join 'auction_histories' with 'buyers'.
 *
 * @export
 * @param {string} id - The auction id.
 * @return {*}
 */
export async function getAllBuyersInAuction(id: string) {
  return sequelize.query(
    `select  user_id, email, fullname, auction_id, MAX(price) as price
    from auctionDB.auction_histories as auctionHis, auctionDB.buyers as buyer
    where auctionHis.user_id = buyer.id
    and auctionHis.auction_id = '${id}'
   group by user_id
    `,
    {
      raw: true,
    },
  );
}
