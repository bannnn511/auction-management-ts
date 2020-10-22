import { Request, Response } from 'express';
import { responseSuccess } from '../../shared/helpers';
import { addOneSignalPlayerIdBusiness } from './business/addOneSignalPlayerIdBusiness';

export async function addOneSignalPlayerIdController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const mss = await addOneSignalPlayerIdBusiness(req);
    responseSuccess(res, { mss });
  } catch (error) {
    next(error);
  }
}
