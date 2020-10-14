import { UserStatus } from '../../../shared/helpers/constant';
import { Buyers } from '../../../database/models';

export function getUserByEmailAndPassword(email: string, password: string) {
  return Buyers.findOne({
    where: {
      email,
      password,
      status: UserStatus.ACTIVE,
    },
  });
}
