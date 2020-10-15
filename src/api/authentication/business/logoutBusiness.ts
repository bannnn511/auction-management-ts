import { Request } from 'express';
import _ from 'lodash';
import { getToken } from '../../../shared';
import { client } from '../../../loader/redis';
import { AppError } from '../../../shared/utils';

/**
 * Logout Business.
 * Delete token by adding token to redis server to blacklist.
 */
export async function logoutBusiness(req: Request) {
  const token = _.defaultTo(getToken(req), '');
  client.rpush('token', token, (err, reply) => {
    if (err) {
      throw new AppError(err.message, 500, true);
    }
    console.log(reply);
  });
  return { message: 'Logout succeed' };
}
