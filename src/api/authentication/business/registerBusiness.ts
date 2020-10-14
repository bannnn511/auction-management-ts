import { Request } from 'express';
import { AppError } from '../../../shared/utils';
import { createUser, getUserIdByEmail } from '../../buyers/database';

export async function registerUserBusiness(req: Request) {
  const { email } = req.body;
  const isUserExist = await getUserIdByEmail(email);
  if (!isUserExist) {
    throw new AppError('User already exist', 500, true);
  }

  const user = await createUser(req.body);
  if (!user) {
    throw new AppError('Create account fail', 500, true);
  }
  return user;
}
