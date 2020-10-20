import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import { createCategory } from '../database';

/**
 * Business for creating new category.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function createNewCategoryBusiness(req: Request) {
  const id = _.get(req, 'currentUser.id', '');
  req.body.createdBy = id;
  req.body.updatedBy = id;
  const { body } = req;
  const category = await createCategory(body);
  if (!category) {
    throw new AppError('Cannot create new category', 500, true);
  }
  return category;
}
