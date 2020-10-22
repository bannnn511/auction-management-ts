import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import { getNotifications } from '../database';

/**
 * Business for get notifications.
 *
 * @export
 * @param {Request} req
 * @return {*} 
 */
export async function getNotificationsBusiness(req: Request) {
  const userId = _.get(req, 'currentUser.id');
  const data = await getNotifications(userId);
  if (!data) {
    throw new AppError("Cannot get this user's notification", 500, true);
  }
  return data;
}
