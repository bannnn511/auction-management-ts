import bcrypt from 'bcrypt';
import {
  UserIsSeller,
  UserStatus,
  UserType,
  Hash,
} from '../../../shared/helpers/constant';

import { Buyers } from '../../../database/models';

/**
 * Query for creating new user.
 * Password will be hashed.
 *
 * @export
 * @param {Buyers} user
 * @return {Promise<Buyers>}
 */
export async function createUser(user: Buyers) {
  const hashPassword = await bcrypt.hash(user.password, Hash.SALT);
  return Buyers.create({
    email: user.email,
    password: hashPassword,
    fullname: user.fullname,
    type: UserType.BUYER,
    status: UserStatus.ACTIVE,
    address: user.address,
    isSeller: UserIsSeller.None,
    plusPoint: 1,
    minusPoint: 0,
  });
}
