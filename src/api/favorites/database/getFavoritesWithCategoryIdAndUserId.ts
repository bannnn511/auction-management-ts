import { Favorites } from '../../../database/models';

/**
 * Query for getting favorites by categoryId and userId.
 *
 * @export
 * @param {string} categoryId - category id
 * @param {string} userId -  user id
 * @return {Promise<Favorites[]>}
 */
export async function getFavoritesWithCategoryIdAndUserId(
  categoryId: string,
  userId: string,
) {
  return Favorites.findAll({
    where: {
      categoryId,
      userId,
    },
  });
}
