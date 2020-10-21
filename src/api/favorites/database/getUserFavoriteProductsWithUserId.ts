import { Favorites, Products } from '../../../database/models';
import { pagination } from '../../../shared/helpers';

/**
 * Query for getting user's favorite products.
 *
 * @export
 * @param {string} userId - user id.
 * @param {number} page - page index.
 * @param {number} pagesize - page sze.
 * @return {Promise<Favorites[]>}
 */
export async function getUserFavoriteProducts(
  userId: string,
  page: number,
  pagesize: number,
) {
  const { offset, limit } = pagination(page, pagesize);
  return Favorites.findAll({
    offset,
    limit,
    where: {
      userId,
    },
    include: [
      {
        model: Products,
      },
    ],
  });
}
