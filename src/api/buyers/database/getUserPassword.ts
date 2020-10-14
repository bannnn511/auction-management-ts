import { UserStatus } from '../../../shared/helpers/constant';
import { Buyers } from '../../../database/models';

export async function getUserPassword(email: string) {
  const buyer = await Buyers.findOne({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
    raw: true,
  });
  return buyer?.password;
}
