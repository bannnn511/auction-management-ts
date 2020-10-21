import { Favorites } from '../../../database/models';

/**
 * Query for getting favorites with product id
 *
 * @export
 * @param {string} productId - product id.
 * @return {Promise<Favorites>}
 */
export async function getFavoriteWithProductId(productId: string) {
  const products = await Favorites.findOne({
    where: {
      productId,
    },
  });
  return products;
}
