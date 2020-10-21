import bcrypt from 'bcrypt';
import { Buyers } from '../../../database/models';
import { Hash, UserStatus } from '../../../shared/helpers/constant';

/**
 * Query for changing user password.
 * Password will be hashed.
 *
 * @export
 * @param {string} id
 * @param {string} password
 * @return {Promise<Buyers>}
 */
export async function updateUserPassword(id: string, password: string) {
  const hash = await bcrypt.hash(password, Hash.SALT);
  await Buyers.update({ password: hash, updatedBy: id }, { where: { id } });
  return Buyers.findOne({
    where: {
      id,
      status: UserStatus.ACTIVE,
    },
  });
}
