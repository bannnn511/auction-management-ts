import { Categories } from '../../../database/models';

/**
 * Query for getting a category with its id.
 *
 * @export
 * @param {string} id
 * @return {*} 
 */
export async function getCategory(id: string) {
  return Categories.findOne({
    where: {
      id,
    },
  });
}
