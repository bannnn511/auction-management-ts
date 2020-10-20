import { AuctionParticipatings } from '../../../database/models/auctionParticipatings';
import { UserBanStatus } from '../../../shared/helpers/constant';

export async function userParticipateAuctions(data: AuctionParticipatings) {
  return AuctionParticipatings.create({
    userId: data.userId,
    auctionId: data.auctionId,
    status: UserBanStatus.ACTIVE,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
    isReminderCreated: false,
  });
}
