import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from "@nestjs/common";
import { Response } from "express";
import { CustomLogger } from "src/logger";
import Error from "src/utils/dictionaries/error.dictionary";
import { ControlledError } from "./error";

@Catch()
export class ErrorsFilter<T> implements ExceptionFilter {
  private logger = new CustomLogger(ErrorsFilter.name);

  catch(exception: T, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    this.logger.error(exception);
    if (exception instanceof ControlledError) {
      const { errorResponse, message } = exception;
      return response
        .status(errorResponse.status)
        .send({ ...errorResponse, message })
    }
    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .send(exception.getResponse());
    }
    return response
      .status(Error.UNKNOWN_ERROR.status)
      .send(Error.UNKNOWN_ERROR);
  }
}