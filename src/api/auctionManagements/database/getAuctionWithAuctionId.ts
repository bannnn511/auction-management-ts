import { AuctionManagements } from '../../../database/models';

/**
 * Query for getting auction with its id.
 *
 * @export
 * @param {string} id - The auction Id.
 * @return {*}
 */
export async function getAllAuctionWithAuctionId(id: string) {
  return AuctionManagements.findOne({
    where: {
      id,
    },
  });
}
