import { Request } from 'express';
import _ from 'lodash';
import { NotificationObject } from '../../../shared/models/notificationObject';
import { AppError } from '../../../shared/utils';
import { markANotificationAsRead } from '../database/markNotificationAsRead';

/**
 * Mark a notification as read.
 *
 * @export
 * @param {Request} req - The request.
 * @return {Promise<Notifications[]>} - Response Notification back to controller.
 */
export async function markANotificationAsReadBusiness(req: Request) {
  const userId = _.get(req, 'currentUser.id');
  const { createdAt, description } = req.body;

  // convert date to mysql date format
  const sqlDate = new Date(createdAt);
  sqlDate.toISOString().slice(0, 19).replace('T', ' ');
  const payload = new NotificationObject(userId, createdAt, description);

  const data = await markANotificationAsRead(payload);
  if (!data) {
    throw new AppError(
      'Cannot mark this notification as read for this user',
      500,
      true,
    );
  }
  return data;
}
