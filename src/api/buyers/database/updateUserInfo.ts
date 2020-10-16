import * as _ from 'lodash';
import { UserType, UserStatus } from '../../../shared/helpers/constant';
import { Buyers } from '../../../database/models';

/**
 * Update a user info.
 * Only admin can change type and status.
 *
 * @export
 * @param {string} id - User id
 * @param {Buyers} buyer - User new info
 * @param {Buyers} defaultInfo - User current info
 * @param {boolean} [isAdmin] - Are you an admin or not
 * @return {Promise<Buyers>}
 */
export async function updateAUserInfo(
  id: string,
  buyer: Buyers,
  defaultInfo: Buyers,
  isAdmin?: boolean,
) {
  let checkBuyerPendingStatus = buyer.isSeller;
  if (buyer.type === UserType.SELLER) {
    checkBuyerPendingStatus = false;
  }
  if (isAdmin) {
    await Buyers.update(
      {
        fullname: _.defaultTo(buyer.fullname, defaultInfo.fullname),
        address: _.defaultTo(buyer.address, defaultInfo.address),
        isSeller: _.defaultTo(checkBuyerPendingStatus, defaultInfo.isSeller),
        updatedBy: _.defaultTo(buyer.updatedBy, defaultInfo.updatedBy),
        type: _.defaultTo(buyer.type, defaultInfo.type),
        status: _.defaultTo(buyer.status, defaultInfo.type),
      },
      {
        where: {
          id,
        },
      },
    );
  } else {
    await Buyers.update(
      {
        fullname: _.defaultTo(buyer.fullname, defaultInfo.fullname),
        address: _.defaultTo(buyer.address, defaultInfo.address),
        isSeller: _.defaultTo(buyer.isSeller, defaultInfo.isSeller),
        updatedBy: _.defaultTo(buyer.updatedBy, defaultInfo.updatedBy),
      },
      {
        where: {
          id,
        },
      },
    );
  }

  return Buyers.findOne({
    where: {
      id,
      status: UserStatus.ACTIVE,
    },
    raw: true,
  });
}
