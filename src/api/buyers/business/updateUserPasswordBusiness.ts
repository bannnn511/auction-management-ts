import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import { updateUserPassword } from '../database';

export async function updateUserPasswordBusiness(req: Request) {
  const { password } = req.body;
  const id = _.get(req, 'currentUser.id');
  const user = await updateUserPassword(id, password);
  if (!user) {
    throw new AppError("Update User's password failed", 500, true);
  }
  return user;
}
