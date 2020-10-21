import { Favorites, Categories } from '../../../database/models';

/**
 * Query for getting user favorite categories.
 *
 * @export
 * @param {string} userId
 * @return {Promise<Favorites[]>}
 */
export async function getUserFavoriteCategories(userId: string) {
  const data = await Favorites.findAll({
    where: {
      userId,
      productId: null,
    },
    include: [
      {
        model: Categories,
        attributes: ['categoryName'],
      },
    ],
  });
  return data;
}
