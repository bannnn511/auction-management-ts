import { Notifications } from '../../../database/models';

/**
 * Query for creating new notifications.
 *
 * @export
 * @param {string} userId
 * @param {string} description
 * @return {Promise<Notifications>}
 */
export async function createNotification(userId: string, description: string) {
  return Notifications.create({
    userId,
    description,
    isRead: false,
    createdBy: userId,
    updatedBy: userId,
  });
}
