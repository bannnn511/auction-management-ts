import { Request } from 'express';
import { AppError } from '../../../shared/utils';
import { getUserById } from '../database';

export async function getUserDetailBusiness(req: Request) {
  const { id } = req.params;
  const buyer = await getUserById(id);
  if (!buyer) {
    throw new AppError(`Cannot get User with id: ${id}`, 500, true);
  }
  return buyer;
}
