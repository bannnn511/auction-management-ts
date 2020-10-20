import { AuctionParticipatings } from '../../../database/models';

/**
 * Query for getting auction participating status of a user
 *
 * @export
 * @param {string} userId - user id
 * @param {string} auctionId - auction id
 * @return {*}
 */
export async function checkUserParticipateAuction(
  userId: string,
  auctionId: string,
) {
  return AuctionParticipatings.findOne({
    where: {
      userId,
      auctionId,
    },
  });
}
