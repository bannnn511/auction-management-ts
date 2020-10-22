import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import { getProducts } from '../database/getProducts';

/**
 * Business for getting all products.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function getAllProductsBusiness(req: Request) {
  const page = _.get(req, 'query.page', 0);
  const pagesize = _.get(req, 'query.pagesize', 0);
  const product = await getProducts(page, pagesize);
  if (!product) {
    throw new AppError('Cannot get Products', 500, true);
  }
  return product;
}
