import { Request } from 'express';
import _ from 'lodash';
import { UserType } from '../../../shared/helpers/constant';
import { AppError } from '../../../shared/utils';
import { getUserById, updateAUserInfo } from '../database';

export async function updateUserInfoBusiness(req: Request) {
  const { body } = req;
  const id = _.get(req, 'currentUser.id', null);
  const isAdmin = _.get(req, 'currentUser.type') === UserType.ADMIN;
  body.updatedBy = id;

  const userInfo = await getUserById(id);
  if (!userInfo) {
    throw new AppError(`There is no user with current id: ${id}`, 500, true);
  }

  const buyer = await updateAUserInfo(id, body, userInfo, isAdmin);
  if (!buyer) {
    throw new AppError("Cannot update Buyer's info", 500, true);
  }
  return buyer;
}
