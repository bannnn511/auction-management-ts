import { Favorites } from '../../../database/models';

/**
 * Query for users to add a category to theirs favorite.
 *
 * @export
 * @param {string} userId - user id
 * @param {string} categoryId - category id
 * @return {Promise<Favorites>}
 */
export async function addCategoryToFavorite(
  userId: string,
  categoryId: string,
) {
  return Favorites.create({
    userId,
    categoryId,
    createdBy: userId,
    updateBy: userId,
  });
}
