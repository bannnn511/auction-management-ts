import { Request } from 'express';
import _ from 'lodash';
import { deleteBuyer } from '../database';
import { AppError } from '../../../shared/utils';

export async function deleteUserBusiness(req: Request) {
  const updatedBy = _.get(req, 'currentUser.id', null);
  const { id } = req.params;
  const buyer = await deleteBuyer(id, updatedBy);
  if (!buyer) {
    throw new AppError('Cannot delete user', 500, true);
  }
  return buyer;
}
