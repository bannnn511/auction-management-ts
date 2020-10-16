import { Response, Request } from 'express';
import { responseSuccess } from '../../shared';
import { logoutBusiness } from '../authentication/business';
import {
  createNewUserByAdminBusiness,
  deleteUserBusiness,
  getAllUserBusiness,
  getUserDetailBusiness,
  updateUserInfoBusiness,
  updateUserPasswordBusiness,
} from './business';
import { serializeAllBuyers, serializeBuyers } from './buyer.serialize';

export async function getAllUsers(req: Request, res: Response, next: any) {
  try {
    const data = await getAllUserBusiness(req);
    console.log(data);
    responseSuccess(res, serializeAllBuyers(data));
  } catch (error) {
    next(error);
  }
}

export async function getUserDetailWithId(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getUserDetailBusiness(req);
    responseSuccess(res, serializeBuyers(data));
  } catch (error) {
    next(error);
  }
}

export async function createNewUser(req: Request, res: Response, next: any) {
  try {
    const data = await createNewUserByAdminBusiness(req);
    responseSuccess(res, serializeBuyers(data));
  } catch (error) {
    next(error);
  }
}

/**
 * Delete user
 * Change status
 */
export async function deleteUser(req: Request, res: Response, next: any) {
  try {
    const data = await deleteUserBusiness(req);
    responseSuccess(res, serializeBuyers(data));
  } catch (error) {
    next(error);
  }
}

/**
 * Update buyer password
 * destroy token after update password
 */
export async function updateUserPassword(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await updateUserPasswordBusiness(req);
    const serializedData = serializeBuyers(data);
    await logoutBusiness(req);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/**
 * Update buyer info
 * Change buyer pending status - need to be admin
 * Accept buyer request to be a seller - need to be admin
 * Update user basic info
 */
export async function updateUserInfo(req: Request, res: Response, next: any) {
  try {
    const data = await updateUserInfoBusiness(req);
    responseSuccess(res, serializeBuyers(data));
  } catch (error) {
    next(error);
  }
}
