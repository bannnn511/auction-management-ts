/**
 * Update all isRead field of a user to true.
 *
 * @param  {string} userId - The Id of user.
 */

import { Notifications } from '../../../database/models';

export async function markAllNotificationsAsRead(userId: string) {
  Notifications.update(
    {
      isRead: true,
    },
    {
      where: {
        userId,
      },
    },
  );
}
