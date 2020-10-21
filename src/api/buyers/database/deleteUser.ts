import { Buyers } from '../../../database/models';
import { UserStatus } from '../../../shared/helpers/constant';

/**
 * Query for changing user status to deleted.
 *
 * @export
 * @param {string} id - user id to be deleted
 * @param {string} updatedBy - who delete this user
 * @return {Promise<Buyers>}
 */
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
