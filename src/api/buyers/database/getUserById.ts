import { Buyers } from '../../../database/models';
import { UserStatus } from '../../../shared/helpers/constant';

export async function getUserById(id: string) {
  return Buyers.findOne({ where: { id, status: UserStatus.ACTIVE } });
}
