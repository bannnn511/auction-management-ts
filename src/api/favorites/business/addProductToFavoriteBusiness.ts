import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import { addProductToFavorite, getFavoriteWithProductId } from '../database';

/**
 * Business for adding product to favorite.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function addProductToFavoriteBusiness(req: Request) {
  const { body } = req;
  const userId = _.get(req, 'currentUser.id', '');
  const existedProduct = await getFavoriteWithProductId(body.productId);
  if (existedProduct) {
    throw new AppError(
      'This product is already in your favorite list',
      500,
      true,
    );
  }
  const product = await addProductToFavorite(userId, body.productId);
  return product;
}
