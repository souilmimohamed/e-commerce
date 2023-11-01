export class ResponseModel<T> {
  Success: boolean = false;
  Errors: string[] = [];
  Warnings: string[] = [];
  Info: string[] = [];
  Body?: T;

  constructor(
    success: boolean,
    body: T | undefined,
    errors: string[],
    info: string[],
    warnings: string[]
  ) {
    this.Success = success;
    this.Body = body;
    this.Errors = errors;
    this.Info = info;
    this.Warnings = warnings;
  }

  static successResponse<T>(body: T): ResponseModel<T> {
    return new ResponseModel<T>(true, body, [], [], []);
  }

  static validationResponse<T>(): ResponseModel<T> {
    return new ResponseModel<T>(true, undefined, [], [], []);
  }

  static failureResponse<T>(errors: string[]): ResponseModel<T> {
    return new ResponseModel<T>(false, undefined, errors, [], []);
  }
}
