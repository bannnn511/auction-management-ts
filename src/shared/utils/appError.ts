class AppError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly isAppError: boolean;

  constructor(message: string, statusCode?: number, isAppError?: boolean) {
    super(message);

    this.message = message;
    this.statusCode = statusCode || 500;
    this.isAppError = isAppError || false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };
