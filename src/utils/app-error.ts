export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
    this.isOperational = true;
  }
}

export class ValidationError extends AppError {
  constructor(message: unknown, statusCode: number) {
    const serializedMessage = JSON.stringify(message);
    super(serializedMessage, statusCode);
    this.message = JSON.parse(serializedMessage);
  }
}
