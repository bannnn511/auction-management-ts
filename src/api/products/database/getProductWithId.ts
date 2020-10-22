import { Products } from '../../../database/models';

/**
 * Query for getting product with its Id.
 *
 * @export
 * @param {string} id - product id.
 * @return {Promise<Products>}
 */
export async function getProductWithId(id: string) {
  const productData = await Products.findOne({
    where: {
      id,
    },
  });
  return productData;
}
