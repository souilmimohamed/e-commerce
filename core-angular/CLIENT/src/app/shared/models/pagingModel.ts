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
