import { UserStatus } from '../../../shared/helpers/constant';
import { Buyers } from '../../../database/models';

export async function getUserIdByEmail(email: string) {
  return Buyers.findOne({
    attributes: ['id'],
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });
}
