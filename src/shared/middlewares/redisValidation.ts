import { getToken } from '../helpers';
import { AppError } from '../utils';

import { client } from '../../loader/redis';

export function redisValidation(req: any, res: any, next: any) {
  const token = getToken(req);
  try {
    client.lrange('token', 0, 99999999, (err: any, reply: any) => {
      if (reply.indexOf(token) > -1) {
        throw new AppError('Invalid Token', 500, true);
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
}
