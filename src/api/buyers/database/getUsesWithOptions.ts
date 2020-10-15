import { UserType, UserStatus } from '../../../shared/helpers/constant';
import { pagination } from '../../../shared/helpers';
import { Buyers } from '../../../database/models';

/**
 * Get users with offset and limit.
 * User which are request to be a seller.
 * User which are already a seller or buyer.
 *
 * @export
 * @param {number} page - index of page
 * @param {number} pagesize - size of one page
 * @param {boolean} isSeller - if users are requesting to be a seller or not
 * @param {string} type - if user are buyer or seller
 * @return {Promise<Buyers[]>} - Array of Users
 */
export async function getUsersWithOptions(
  page: number,
  pagesize: number,
  isSeller: boolean,
  type: string,
): Promise<Buyers[]> {
  const { offset, limit } = pagination(page, pagesize);
  let defaultType = type;
  if (isSeller === true && type === UserType.SELLER) {
    defaultType = UserType.BUYER;
  }
  if (type === undefined && isSeller !== undefined) {
    return Buyers.findAll({
      where: {
        isSeller,
        status: UserStatus.ACTIVE,
      },
      offset,
      limit,
    });
  }

  if (type !== undefined && isSeller === undefined) {
    return Buyers.findAll({
      where: {
        status: UserStatus.ACTIVE,
        type: defaultType,
      },
      offset,
      limit,
    });
  }
  return Buyers.findAll({
    where: {
      isSeller,
      status: UserStatus.ACTIVE,
      type: defaultType,
    },
    offset,
    limit,
  });
}
