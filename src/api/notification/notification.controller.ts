import { Request, Response } from 'express';
import { responseSuccess } from '../../shared/helpers';
import {
  createNotificationBusiness,
  getNotificationsBusiness,
  markAllNotificationsAsReadBusiness,
} from './business';
import { markANotificationAsReadBusiness } from './business/markANotificationAsReadBusiness';
import {
  serializeAllNotifications,
  serializeNotification,
} from './notification.serialize';

/**
 * Controller for getting notifications.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getNotificationsController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getNotificationsBusiness(req);
    responseSuccess(res, serializeAllNotifications(data));
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for creating notification.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function createNotificationController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await createNotificationBusiness(req);
    responseSuccess(res, serializeNotification(data));
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for marking all notifications as read.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function markAllNotificationsAsReadController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await markAllNotificationsAsReadBusiness(req);
    responseSuccess(res, serializeAllNotifications(data));
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for marking a notification as read.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function markANotificationAsReadController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await markANotificationAsReadBusiness(req);
    responseSuccess(res, serializeAllNotifications(data));
  } catch (error) {
    next(error);
  }
}
