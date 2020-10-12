import { AppError } from '../utils';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err: AppError, req: any, res: any, next: any) {
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
