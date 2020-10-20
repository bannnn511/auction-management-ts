import { Categories } from '../../../database/models';

/**
 * Query for updating category name
 *
 * @export
 * @param {string} categoryId - category id
 * @param {string} categoryName - new category name
 * @return {*}
 */
export async function updateCategory(categoryId: string, categoryName: string) {
  await Categories.update({ categoryName }, { where: { id: categoryId } });
  return Categories.findOne({
    attributes: ['categoryName', 'createdBy', 'updatedBy'],
    where: {
      id: categoryId,
    },
  });
}
