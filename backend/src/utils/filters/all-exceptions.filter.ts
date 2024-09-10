import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    let errorMessage = 'An error occurred';

    // If the response is an array of errors
    if (Array.isArray(exceptionResponse.message)) {
      errorMessage = exceptionResponse.message[0];
    } else if (typeof exceptionResponse === 'object') {
      errorMessage = exceptionResponse.message || errorMessage;
    }

    // Log the error message
    Logger.error(
      `Status: ${status}, Message: ${errorMessage}, Stack: ${exception.stack}`,
    );
    response.status(status).json({
      statusCode: status,
      message: errorMessage,
    });
  }
}
