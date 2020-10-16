import { Request } from 'express';
import _ from 'lodash';
import { UserType } from '../../../shared/helpers/constant';
import { getBuyers, getUsersWithOptions } from '../database';
import { AppError } from '../../../shared/utils';

export async function getAllUserBusiness(req: Request) {
  const isSeller = _.get(req, 'query.isseller', false);
  const type = _.get(req, 'query.type', UserType.BUYER);
  const page = _.get(req, 'query.page', 0);
  const pagesize = _.get(req, 'query.pagesize', 0);

  let data;
  if (isSeller !== undefined || type !== undefined) {
    data = await getUsersWithOptions(page, pagesize, isSeller, type);
  } else {
    data = await getBuyers(page, pagesize);
  }
  if (!data) {
    throw new AppError('Cannot get Buyers', 500, true);
  }
  return data;
}
