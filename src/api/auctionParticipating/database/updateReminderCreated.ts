import { AuctionParticipatings } from '../../../database/models';

/**
 * Query for updating 'is_reminder_created' field to true
 *
 * @export
 * @param {string} userId - user id
 * @param {string} auctionId - auction id
 */
export async function updateReminderCreated(userId: string, auctionId: string) {
  AuctionParticipatings.update(
    {
      isReminderCreated: true,
    },
    {
      where: {
        userId,
        auctionId,
      },
    },
  );
}
