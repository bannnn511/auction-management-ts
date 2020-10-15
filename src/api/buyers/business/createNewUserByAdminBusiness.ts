import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import { createUser, getUserIdByEmail } from '../database';

export async function createNewUserByAdminBusiness(req: Request) {
  const { body } = req;
  body.createdBy = _.get(req, 'currentUser.id', '');
  body.updatedBy = body.createdBy;
  const checkBuyerExist = await getUserIdByEmail(body);
  if (checkBuyerExist) {
    throw new AppError('User already exists', 500, true);
  }
  const buyer = await createUser(body);
  if (!buyer) {
    throw new AppError('Cannot create user', 500, true);
  }
  return buyer;
}
