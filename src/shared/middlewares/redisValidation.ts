import { Request, Response } from 'express';
import { getToken } from '../helpers';
import { AppError } from '../utils';

import { client } from '../../loader/redis';

/**
 * A middleware to check if token is valid.
 * Return 'Invalid Token' if token exists in blacklist server.
 * If valid go to next middleware.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 */
export function redisValidation(req: Request, res: Response, next: any) {
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
