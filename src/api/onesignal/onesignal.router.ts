import { Router } from 'express';
import { authentication, redisValidation, validateBody } from '../../shared';
import { addOneSignalPlayerIdController } from './onesignal.controller';
import { OneSignalSchema } from './onesignal.schema';

const onesignalRouter = Router();

onesignalRouter.post(
  '/',
  authentication,
  redisValidation,
  validateBody(OneSignalSchema),
  addOneSignalPlayerIdController,
);

export { onesignalRouter };
