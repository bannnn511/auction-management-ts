import { Products } from '../../../database/models';
import { pagination } from '../../../shared/helpers';

/**
 * Query for getting products.
 *
 * @export
 * @param {number} page
 * @param {number} pagesize
 * @return {*}
 */
export function getProducts(page: number, pagesize: number) {
  const { offset, limit } = pagination(page, pagesize);
  const products = Products.findAll({
    offset,
    limit,
  });
  return products;
}
