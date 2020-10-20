import { Router } from 'express';
import { authentication, redisValidation, validateBody } from '../../shared';
import {
  registerController,
  loginController,
  logoutController,
} from './authentication.controller';
import {
  AccountLoginSchema,
  AccountRegisterSchema,
} from './authentication.schema';

const authRouter = Router();

authRouter.post('/login', validateBody(AccountLoginSchema), loginController);
authRouter.post(
  '/register',
  validateBody(AccountRegisterSchema),
  registerController,
);
authRouter.get('/logout', authentication, redisValidation, logoutController);

export { authRouter };
