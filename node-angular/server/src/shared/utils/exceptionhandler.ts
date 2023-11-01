import { Request } from "express";
import { ResponseModel } from "../models";
import logger from "./logger";

export const handleException = (request: Request, error: Error) => {
  logger.logRequestError(request, error);
  return ResponseModel.failureResponse([error.message]);
};
