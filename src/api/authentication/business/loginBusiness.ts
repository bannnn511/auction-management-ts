import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import _ from 'lodash';
import {
  getUserByEmailAndPassword,
  getUserPassword,
} from '../../buyers/database';
import { AppError } from '../../../shared/utils';

/**
 * Login Business.
 * Compare password with hash password in database.
 * @returns {Promise<object>} - Return JSON web token.
 */
export async function loginBusiness(req: Request): Promise<object> {
  const { email, password } = req.body;

  const passOfUser = _.toString(await getUserPassword(email));
  const match = await bcrypt.compare(password, passOfUser);
  if (match) {
    const user = await getUserByEmailAndPassword(email, passOfUser);

    if (!user) {
      throw new AppError('Username or password does not exist.', 500, true);
    }

    // token expires in 15 minutes
    const token = jwt.sign(
      { id: user.id, permissions: user.type },
      _.toString(process.env.JWT_SECRET_KEY),
      { expiresIn: '1h' },
    );

    return { token };
  }

  throw new AppError('Invalid Input', 400, true);
}
