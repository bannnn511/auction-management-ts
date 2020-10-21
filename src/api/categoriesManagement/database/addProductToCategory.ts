import { Transaction } from 'sequelize/types';
import { CategoriesManagements } from '../../../database/models/categoryManagements';

/**
 * Query for adding a product to a category.
 *
 * @export
 * @param {CategoriesManagements} data
 * @param {Transaction} t
 * @return {Promise<CategoriesManagements>}
 */
export async function addProductToCategory(
  data: CategoriesManagements,
  t: Transaction,
) {
  return CategoriesManagements.create(
    {
      categoryId: data.categoryId,
      productId: data.productId,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    },
    { transaction: t },
  );
}
