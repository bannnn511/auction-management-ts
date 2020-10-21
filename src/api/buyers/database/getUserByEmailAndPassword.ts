import { UserStatus } from '../../../shared/helpers/constant';
import { Buyers } from '../../../database/models';

/**
 * Query for getting user by his/her email and password.
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @return {Promise<Buyers>}
 */
export function getUserByEmailAndPassword(email: string, password: string) {
  return Buyers.findOne({
    where: {
      email,
      password,
      status: UserStatus.ACTIVE,
    },
  });
}
