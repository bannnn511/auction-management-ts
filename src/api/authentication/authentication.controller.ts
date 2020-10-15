import { Request, Response } from 'express';
import { responseSuccess } from '../../shared';
import { serializeUser } from './authentication.serialize';
import {
  loginBusiness,
  logoutBusiness,
  registerUserBusiness,
} from './business';

/**
 * Login controller.
 * Response token.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function login(req: Request, res: Response, next: any) {
  try {
    const token = await loginBusiness(req);
    responseSuccess(res, token);
  } catch (error) {
    next(error);
  }
}

/**
 * Register account controller.
 * Response new account information.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function register(req: Request, res: Response, next: any) {
  try {
    const data = await registerUserBusiness(req);
    const serializedData = serializeUser(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/**
 * Logout controller
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function logout(req: Request, res: Response, next: any) {
  try {
    responseSuccess(res, await logoutBusiness(req));
  } catch (error) {
    next(error);
  }
}
