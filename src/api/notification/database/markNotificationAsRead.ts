import { Notifications } from '../../../database/models';

/**
 * Update on notification "isRead" field to true.
 *
 * @param {Data} data - The data from request.
 * @return {Promise<Notifications[]>} - An array of notifications object.
 */

export async function markANotificationAsRead(data: Notifications) {
  await Notifications.update(
    { isRead: true },
    {
      where: {
        userId: data.userId,
        created_at: data.createdAt,
        description: data.description,
      },
    },
  );
  return Notifications.findAll({
    where: {
      userId: data.userId,
    },
    raw: true,
  });
}
