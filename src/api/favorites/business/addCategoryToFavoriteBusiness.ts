import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import { getCategoryId } from '../../categories/database';
import {
  addCategoryToFavorite,
  getFavoritesWithCategoryIdAndUserId,
  userUnlikeACategory,
} from '../database';

/**
 * Check if user has already like a category.
 * If query succeed, then user already like this category, then return true.
 * else return false.
 *
 * @param {string} categoryId - category id.
 * @param {string} userId - user id.
 * @return {Promise<boolean>}
 */
async function checkIfAlreadyLikeCategory(categoryId: string, userId: string) {
  const exist = await getFavoritesWithCategoryIdAndUserId(categoryId, userId);
  if (exist) {
    return true;
  }
  return false;
}

/**
 * Business for adding a category to user's favorite.
 * If user already liked this category, then unlike that category.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function addCategoryToFavoriteBusiness(req: Request) {
  const { category } = req.body;

  const userId = _.get(req, 'currentUser.id', '');
  const categoryId = await getCategoryId(category);
  if (!categoryId) {
    throw new AppError(`${category} category does not exist`, 500, true);
  }

  // check if user already like this category.
  if (await checkIfAlreadyLikeCategory(categoryId, userId)) {
    const deleteFav = await userUnlikeACategory(categoryId, userId);
    if (deleteFav) {
      return 'Delete favorite category';
    }
  }
  const data = await addCategoryToFavorite(userId, categoryId);
  if (!data) {
    throw new AppError('Cannot add category to favorite', 500, true);
  }
  return data;
}
