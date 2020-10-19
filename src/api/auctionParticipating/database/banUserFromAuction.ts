import { AuctionParticipatings } from '../../../database/models';
import { UserBanStatus } from '../../../shared/helpers/constant';

export async function banUserFromAuctions(data: AuctionParticipatings) {
  return AuctionParticipatings.create({
    userId: data.userId,
    auctionId: data.auctionId,
    status: UserBanStatus.BAN,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  });
}
