import { ApplicationError } from './application.error';

export class DataNotFoundError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? 'Data not found.', {
      errorCode: 'ERR_DATA_NOT_FOUND',
      statusCode: 404,
    });
  }
}
