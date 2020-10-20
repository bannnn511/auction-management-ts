import {
  AuctionManagements,
  AuctionParticipatings,
} from '../../../database/models';

/**
 * Query for getting reminders which notification have not been created.
 * Limit to 100 tuples per query.
 *
 * @export
 * @return {*}
 */
export async function getListRemindersUncreated() {
  return AuctionParticipatings.findAll({
    include: [
      {
        model: AuctionManagements,
        as: 'auctionManagements',
      },
    ],
    where: {
      isReminderCreated: false,
    },
    raw: true,
    limit: 100,
  });
}
