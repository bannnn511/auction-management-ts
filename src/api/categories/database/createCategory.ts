import { Categories } from '../../../database/models/categories';

/**
 * Query for creating new category.
 *
 * @export
 * @param {Categories} category
 * @return {*}
 */
export async function createCategory(category: Categories) {
  return Categories.create({
    categoryName: category.categoryName,
    createdBy: category.createdBy,
    updatedBy: category.updatedBy,
  });
}
