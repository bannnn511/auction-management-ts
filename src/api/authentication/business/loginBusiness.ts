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

  const passOfUser = await getUserPassword(email);
  const match = await bcrypt.compare(passOfUser, password);
  if (match) {
    const user = await getUserByEmailAndPassword(email, password);

    if (!user) {
      throw new AppError('Username or password does not exist.', 500, true);
    }

    const token = jwt.sign(
      { id: user.id, permissions: user.type },
      _.toString(process.env.JWT_SECRET_KEY),
      { expiresIn: '15p' },
    );

    return { token };
  }

  throw new AppError('Invalid Input', 400, true);
}
