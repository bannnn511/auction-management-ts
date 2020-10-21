import { UserStatus } from '../../../shared/helpers/constant';
import { Buyers } from '../../../database/models';

/**
 * Query for getting user id by his/her email.
 *
 * @export
 * @param {string} email
 * @return {Promise<Buyers>}
 */
export async function getUserIdByEmail(email: string) {
  return Buyers.findOne({
    attributes: ['id'],
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });
}
