/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { AppError } from '../utils';

/**
 * Central error handler middleware.
 * If is AppError return message.
 * If not return ambiguous message.
 *
 * @export
 * @param {AppError} err
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 * @return {*}
 */
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: any,
) {
  console.error('🔥🔥🔥 Error handler', err);

  if (err.isAppError) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
      error: err,
      // stack: err.stack,
    });
  }

  return res.status(err.statusCode || 500).json({
    message: 'Something went wrong...',
  });
}
