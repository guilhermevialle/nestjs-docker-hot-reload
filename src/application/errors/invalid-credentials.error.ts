import { ApplicationError } from './application.error';

export class InvalidCredentialsError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? 'Invalid credentials.', {
      errorCode: 'ERR_INVALID_CREDENTIALS',
      statusCode: 401,
    });
  }
}
