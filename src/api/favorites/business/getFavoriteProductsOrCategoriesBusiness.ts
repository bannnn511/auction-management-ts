import { Request } from 'express';
import _ from 'lodash';

import { userFavoriteType } from '../../../shared/helpers/constant';
import { AppError } from '../../../shared/utils';
import {
  getUserFavoriteCategories,
  getUserFavoriteProducts,
} from '../database';

/**
 * Business for getting favorite products/categories.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getFavoriteProductsOrCategoriesBusiness(req: Request) {
  const page = _.get(req, 'query.page', 0);
  const pagesize = _.get(req, 'query.pagesize', 0);
  const type = _.get(req, 'query.type', '');
  const userId = _.get(req, 'currentUser.id', '');

  if (type === userFavoriteType.CATEGORY) {
    const data = await getUserFavoriteCategories(userId);
    if (!data) {
      throw new AppError('Cannot get user favorite categories', 500, true);
    }
    return data;
  }
  const favorites = await getUserFavoriteProducts(userId, page, pagesize);
  if (!favorites) {
    throw new AppError('Cannot get user favorite products', 500, true);
  }
  return favorites;
}
