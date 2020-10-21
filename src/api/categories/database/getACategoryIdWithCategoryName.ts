import { Categories } from '../../../database/models';

/**
 * Query for getting a category id base on its name.
 *
 * @export
 * @param {string} categoryName - category name
 * @return {Promise<Categories>}
 */
export async function getCategoryId(categoryName: string) {
  const data = await Categories.findOne({
    attributes: ['id'],
    where: {
      categoryName,
    },
  });
  return data!.id;
}
