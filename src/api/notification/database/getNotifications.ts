import { Notifications } from '../../../database/models';

/**
 * Query for getting notifications of a user.
 * Order by 'created_at' date.
 *
 * @export
 * @param {string} userId - user id.
 * @return {Promise<Notifications[]>}
 */
export async function getNotifications(userId: string) {
  const data = await Notifications.findAll({
    where: { userId },
    raw: true,
    order: [['created_at', 'DESC']],
  });
  return data;
}
