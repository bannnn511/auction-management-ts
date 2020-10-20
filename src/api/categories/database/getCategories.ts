import { Categories } from '../../../database/models';
import { pagination } from '../../../shared/helpers';

/**
 * Query for getting all categories.
 *
 * @export
 * @param {number} page
 * @param {number} pagesize
 * @return {*}
 */
export async function getAllCategories(page: number, pagesize: number) {
  const { offset, limit } = pagination(page, pagesize);
  const data = await Categories.findAll({
    offset,
    limit,
  });
  return data;
}
