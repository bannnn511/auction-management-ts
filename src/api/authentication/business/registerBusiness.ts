import { Request } from 'express';
import { Buyers } from '../../../database/models';
import { AppError } from '../../../shared/utils';
import { createUser, getUserIdByEmail } from '../../buyers/database';

/**
 * Create new User.
 * Check duplicate email.
 *
 * @export
 * @return {Promise<Buyers>}
 */
export async function registerUserBusiness(req: Request): Promise<Buyers> {
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
