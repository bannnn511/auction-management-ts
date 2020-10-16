import { Buyers } from '../../../database/models';

export async function getUserById(id: string) {
  return Buyers.findOne({ where: { id } });
}
