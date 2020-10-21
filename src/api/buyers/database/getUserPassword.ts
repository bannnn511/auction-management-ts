import { UserStatus } from '../../../shared/helpers/constant';
import { Buyers } from '../../../database/models';

/**
 * Query for getting user password.
 *
 * @export
 * @param {string} email - user email.
 * @return {Promise<string>} - user password.
 */
export async function getUserPassword(email: string) {
  const buyer = await Buyers.findOne({
    attributes: ['password'],
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
    raw: true,
  });
  return buyer?.password;
}
