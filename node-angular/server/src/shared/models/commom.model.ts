import { Router } from "express";

export interface IHandle<TResponse> {
  handle: () => Promise<TResponse>;
  validate: () => Promise<TResponse>;
}

export interface Controller {
  name: string;
  route: Router;
}

export interface PagingRequestModel {
  requestedPage: number;
  itemsPerPage: number;
}

export interface PagingResponseModel<T> {
  count: number;
  itemsPerPage: number;
  requestedPage: number;
  items: T[];
}
