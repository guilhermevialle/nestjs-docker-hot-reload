import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
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

    if (exception instanceof BadRequestException) {
      const res: any = exception.getResponse();
      return response.status(400).json({
        statusCode: 400,
        errorCode: 'ERR_BAD_REQUEST',
        errors: res.message,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      errorCode: 'ERR_UNEXPECTED',
      message: 'Unexpected server error.',
      stack: (exception as Error).stack,
    });
  }
}
