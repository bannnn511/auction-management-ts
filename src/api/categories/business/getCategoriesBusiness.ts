import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import { getAllCategories } from '../database';

/**
 * Business for getting categories.
 *
 * @export
 * @param {Request} req
 * @return {*} 
 */
export async function getCategoriesBusiness(req: Request) {
  const page = _.get(req, 'query.page', 0);
  const pagesize = _.get(req, 'query.pagesize', 0);
  const categories = await getAllCategories(page, pagesize);
  if (!categories) {
    throw new AppError('Cannot get category list', 500, true);
  }
  return categories;
}
