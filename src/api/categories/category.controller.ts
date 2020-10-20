import { Request, Response } from 'express';
import {
  getCategoriesBusiness,
  createNewCategoryBusiness,
  updateCategoryBusiness,
} from './business/index';
import { responseSuccess } from '../../shared/helpers';
import {
  serializeAllCategories,
  serializeCategory,
} from './category.serialize';

/**
 * Controller for getting categories.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getCategoriesController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const categories = await getCategoriesBusiness(req);
    const data = serializeAllCategories(categories);
    responseSuccess(res, data);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for creating new category.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function createNewCategoryController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const category = await createNewCategoryBusiness(req);
    const data = serializeCategory(category);
    responseSuccess(res, data);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for updating category info.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function updateCategoryInfoController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const category = await updateCategoryBusiness(req);
    const data = serializeCategory(category);
    responseSuccess(res, data);
  } catch (error) {
    next(error);
  }
}
