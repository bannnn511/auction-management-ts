import { Router } from 'express';
import { authentication, redisValidation, validateBody } from '../../shared';
import { createNotification } from './database';
import {
  getNotificationsController,
  markAllNotificationsAsReadController,
  markANotificationAsReadController,
} from './notification.controller';
import { NotificationSchema, NotificationUpdateSchema } from './notification.schema';

const notificationRouter = Router();

notificationRouter.get(
  '/',
  authentication,
  redisValidation,
  getNotificationsController,
);

notificationRouter.post(
  '/',
  validateBody(NotificationSchema),
  authentication,
  redisValidation,
  createNotification,
);

notificationRouter.put(
  '/all',
  authentication,
  redisValidation,
  markAllNotificationsAsReadController,
);

notificationRouter.put(
  '/',
  validateBody(NotificationUpdateSchema),
  authentication,
  redisValidation,
  markANotificationAsReadController,
);

export { notificationRouter };
