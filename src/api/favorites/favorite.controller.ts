import { Request, Response } from 'express';
import { responseSuccess } from '../../shared/helpers';
import {
  addCategoryToFavoriteBusiness,
  addProductToFavoriteBusiness,
  getFavoriteProductsOrCategoriesBusiness,
} from './business';
import { serializeAllFavorite, serializeFavorite } from './favorite.serialize';

/**
 * Controller for adding product to favorite.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function addProductToFavoriteController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await addProductToFavoriteBusiness(req);
    const serializedData = serializeFavorite(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for getting favorite products/categories.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getFavoriteProductOrCategoryController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getFavoriteProductsOrCategoriesBusiness(req);
    const serializedData = serializeAllFavorite(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for adding category to favorite.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function addCategoryToFavoriteController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await addCategoryToFavoriteBusiness(req);
    const serializedData = serializeFavorite(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}
