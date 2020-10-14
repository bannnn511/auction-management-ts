import { Request } from 'express';
import _ from 'lodash';
import { getToken } from '../../../shared';
import { client } from '../../../loader/redis';
import { AppError } from '../../../shared/utils';

export async function logoutBusiness(req: Request) {
  const token = _.defaultTo(getToken(req), '');
  await client.rpush('token', token, (err, reply) => {
    if (err) {
      throw new AppError(err.message, 500, true);
    }
    console.log(reply);
  });
  return { message: 'Logout succed' };
}
