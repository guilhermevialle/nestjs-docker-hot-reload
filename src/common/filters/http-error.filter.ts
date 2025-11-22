import { ArgumentsHost, Catch } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError } from 'src/application/errors/application.error';

@Catch()
export class HttpErrorFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ApplicationError) {
      return response.status(exception.statusCode).json({
        message: exception.message,
        statusCode: exception.statusCode,
        errorCode: exception.errorCode,
        timestamp: exception.occurredAt,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      errorCode: 'ERR_UNEXPECTED',
      message: 'Unexpected server error.',
    });
  }
}
