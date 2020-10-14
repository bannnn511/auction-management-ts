import bcrypt from 'bcrypt';
import {
  UserIsSeller,
  UserStatus,
  UserType,
  Hash,
} from '../../../shared/helpers/constant';

import { Buyers } from '../../../database/models';
import { User } from '../../../shared/models';

export async function createUser(user: User) {
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
