import { ApplicationError } from './application.error';

export class ConflictError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? 'Conflict.', {
      errorCode: 'ERR_CONFLICT',
      statusCode: 409,
    });
  }
}
