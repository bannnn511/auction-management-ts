import { Transaction } from 'sequelize/types';
import { Products } from '../../../database/models/products';

/**
 * Query for creating new Products.
 *
 * @export
 * @param {Products} product
 * @param {Transaction} transaction
 * @return {Promise<Products>}
 */
export async function createProduct(
  product: Products,
  transaction: Transaction,
) {
  const newProduct = await Products.create(
    {
      productName: product.productName,
      imgURL: product.imgURL,
      currentPrice: product.currentPrice,
      buyNowPrice: product.buyNowPrice,
      createdBy: product.createdBy,
      updatedBy: product.updatedBy,
    },
    {
      transaction,
    },
  );
  return newProduct;
}
