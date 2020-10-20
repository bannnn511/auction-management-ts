import { Request } from 'express';
import { updateCategory, getCategory } from '../database';
import { AppError } from '../../../shared/utils';

/**
 * Business for updating category
 *
 * @export
 * @param {Request} req
 * @return {*} 
 */
export async function updateCategoryBusiness(req: Request) {
  const { body } = req;
  const { id } = req.params;
  const existedCategory = await getCategory(id);
  if (!existedCategory) {
    throw new AppError('This category is not existed', 500, true);
  }
  const category = await updateCategory(id, body.categoryName);
  return category;
}
