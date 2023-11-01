export interface ResponseModel<T> {
  Success: boolean;
  Errors: string[];
  Warning: string[];
  Info: string[];
  Body: T;
}

export interface PagingRequestModel {
  PageNumer: number;
  PageSize: number;
}

export interface PagingResponseModel<T> {
  TotalCount: number;
  PageSize: number;
  CurrentPage: number;
  TotalPages: number;
  Items: T[];
}
