import { AuctionParticipatings } from '../../../database/models/auctionParticipatings';
import { UserBanStatus } from '../../../shared/helpers/constant';

/**
 * Query for mark that user have participated an auction.
 *
 * @export
 * @param {string} userId
 * @param {string} auctionId
 * @return {*}
 */
export async function userParticipateAuctions(
  userId: string,
  auctionId: string,
) {
  return AuctionParticipatings.create({
    userId,
    auctionId,
    status: UserBanStatus.ACTIVE,
    createdBy: userId,
    updatedBy: userId,
    isReminderCreated: false,
  });
}
