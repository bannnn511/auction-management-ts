import Joi from 'joi';
import { defaultLimit } from './constant';
import { safeParseInt } from './handleData';

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(0),
  pagesize: Joi.number().integer().min(0),
});

/**
 * Get offset and limit base on page and pagesize.
 *
 * @export
 * @param {number} page - The index of page.
 * @param {number} pagesize - Size of page.
 * @return {number, number} - offset and limit for database query.
 */
export function pagination(page: number, pagesize: number) {
  const offset = safeParseInt(
    (page - 1 >= 0 ? page - 1 : page) * pagesize,
    defaultLimit.OFFSET,
  );
  const limit = safeParseInt(pagesize, defaultLimit.LIMIT);
  return { offset, limit };
}
