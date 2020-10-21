import { Favorites } from '../../../database/models';

/**
 * Query for getting favorites with category id.
 *
 * @export
 * @param {string} categoryId - category id.
 * @return {Promise<Favorites[]>}
 */
export async function getFavoritesWithCategoryId(categoryId: string) {
  return Favorites.findAll({
    where: {
      categoryId,
    },
  });
}
