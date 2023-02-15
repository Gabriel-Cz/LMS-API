import { ApiResponse } from './entities/response.entity';

export class ControlledError extends Error {
  public errorResponse: ApiResponse;
  constructor(errorResponse: ApiResponse, message = '') {
    super();
    this.message = message;
    this.errorResponse = errorResponse;
  }
}
