import { AuctionParticipatings } from '../../../database/models/auctionParticipatings';
import { UserBanStatus } from '../../../shared/helpers/constant';

/**
 * Query for getting user ban status from an auction.
 *
 * @export
 * @param {string} auctionId - auction id
 * @param {string} userId - user id
 * @return {*}
 */
export async function getUserBanStatusFromAuctions(
  auctionId: string,
  userId: string,
) {
  const auction = await AuctionParticipatings.findOne({
    where: {
      auctionId,
      userId,
      status: UserBanStatus.BAN,
    },
  });
  if (auction == null) {
    return UserBanStatus.ACTIVE;
  }
  return UserBanStatus.BAN;
}
