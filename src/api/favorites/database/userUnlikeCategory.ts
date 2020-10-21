import { Favorites } from '../../../database/models';

/**
 * User unlike a category.
 *
 * @export
 * @param {string} categoryId - category id
 * @param {string} userId - user id
 * @return {*}
 */
export async function userUnlikeACategory(categoryId: string, userId: string) {
  return Favorites.destroy({
    where: {
      categoryId,
      userId,
    },
  });
}
