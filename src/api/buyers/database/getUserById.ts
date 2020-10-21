import { Buyers } from '../../../database/models';

/**
 * Query for get user by id.
 *
 * @export
 * @param {string} id - user id
 * @return {Promise<Buyers>}
 */
export async function getUserById(id: string) {
  return Buyers.findOne({ where: { id } });
}
