import { Favorites } from '../../../database/models';

/**
 * Query for users to add a product to theirs favorite.
 *
 * @export
 * @param {string} userId
 * @param {string} productId
 * @return {Promise<Favorites>}
 */
export async function addProductToFavorite(userId: string, productId: string) {
  return Favorites.create({
    userId,
    productId,
    createdBy: userId,
    updatedBy: userId,
  });
}
