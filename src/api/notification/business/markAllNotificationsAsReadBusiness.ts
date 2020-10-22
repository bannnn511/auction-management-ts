import { Request } from 'express';
import _ from 'lodash';
import { getNotifications, markAllNotificationsAsRead } from '../database';

/**
 * Mark all notifications as read.
 *
 * @export
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @return {Promise<Notification[]>} - Response [Notficcations] back to controller.
 */
export async function markAllNotificationsAsReadBusiness(req: Request) {
  const userId = _.get(req, 'currentUser.id');
  await markAllNotificationsAsRead(userId);
  return getNotifications(userId);
}
