import { Request } from 'express';
import _ from 'lodash';
import { Notifications } from '../../../database/models';
import { AppError } from '../../../shared/utils';
import { createNotification } from '../database';

/**
 * Business for creating notification.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function createNotificationBusiness(req: Request) {
  const userId = _.get(req, 'currentUser.id');
  const { description } = req.body;
  const payload = new Notifications(userId, description);
  const data = await createNotification(payload);
  if (!data) {
    throw new AppError('Cannot create notification log', 500, true);
  }
  return data;
}
