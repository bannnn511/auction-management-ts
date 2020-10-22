import { Transaction } from 'sequelize/types';
import { Products } from '../../../database/models';

/**
 * Query for updating product currentPrice.
 *
 * @export
 * @param {Products} body
 * @param {Transaction} t
 * @return {Promise<Products>}
 */
export async function updateProductPrice(body: Products, t: Transaction) {
  await Products.update(
    {
      currentPrice: body.currentPrice,
      updatedBy: body.updatedBy,
    },
    {
      where: {
        id: body.id,
      },
      transaction: t,
    },
  );
  return Products.findOne({
    where: {
      id: body.id,
    },
  });
}
