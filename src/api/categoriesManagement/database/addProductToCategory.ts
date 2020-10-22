import { Transaction } from 'sequelize/types';
import { CategoriesManagements } from '../../../database/models/categoryManagements';

/**
 * Query for adding a product to a category.
 *
 * @export
 * @param {string} categoryId - category id
 * @param {string} productId - product id
 * @param {string} createdBy - user id
 * @param {string} updatedBy - user id
 * @param {Transaction} t
 * @return {Promise<CategoriesManagements>}
 */
export async function addProductToCategory(
  categoryId: string,
  productId: string,
  createdBy: string,
  updatedBy: string,
  t: Transaction,
) {
  return CategoriesManagements.create(
    {
      categoryId,
      productId,
      createdBy,
      updatedBy,
    },
    { transaction: t },
  );
}
