import { Router } from 'express';
import { authentication, redisValidation, validateBody } from '../../shared';
import { login, register, logout } from './authentication.controller';
import { AccountLoginSchema, AccountRegisterSchema } from './authentication.schema';

const authRouter = Router();

authRouter.post('/login', validateBody(AccountLoginSchema), login);
authRouter.post('/register', validateBody(AccountRegisterSchema), register);
authRouter.get('/logout', authentication, redisValidation, logout);

export { authRouter };
