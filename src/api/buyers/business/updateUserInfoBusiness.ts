import { Request } from 'express';
import _ from 'lodash';
import { UserType } from '../../../shared/helpers/constant';

import { AppError } from '../../../shared/utils';
import { updateAUserInfo } from '../database';

/**
 * Implementation of update user informations business.
 *
 * @export
 * @param {Request} req
 * @return {Promise<Buyers>}
 */
export async function updateUserInfoBusiness(req: Request) {
  const { body } = req;
  let id: string;
  const isAdmin = _.get(req, 'currentUser.type') === UserType.ADMIN;

  // if request sent by admin, id to update is in parameters.
  if (isAdmin) {
    id = _.get(req, 'params.id', '');
  } else {
    id = _.get(req, 'currentUser.id', '');
  }
  body.updatedBy = id;

  // user default info
  const userInfo = _.get(req, 'currentUser');

  const buyer = await updateAUserInfo(id, body, userInfo, isAdmin);
  if (!buyer) {
    throw new AppError("Cannot update Buyer's info", 500, true);
  }

  return buyer;
}
