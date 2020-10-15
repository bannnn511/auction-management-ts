import { Buyers } from '../../../database/models';
import { UserStatus } from '../../../shared/helpers/constant';

export async function deleteBuyer(id: string, updatedBy: string) {
  await Buyers.update(
    { status: UserStatus.DELETED, updatedBy },
    {
      where: {
        id,
      },
    },
  );
  return Buyers.findOne({
    attributes: ['id', 'email', 'fullname', 'type', 'status'],
    where: {
      id,
    },
  });
}
