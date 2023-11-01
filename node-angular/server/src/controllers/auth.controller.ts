import { Request, Response } from "express";
import { LoginHandler } from "../handlers/auth";
import { Credentials, ResponseModel } from "../shared/models";
import { handleException } from "../shared/utils/exceptionhandler";

export const login = async (req: Request, res: Response) => {
  try {
    const credentials: Credentials = req.body;
    let response = await new LoginHandler(credentials).handle();
    res.status(200).send(response);
  } catch (error: any) {
    handleException(req, error);
    res.status(404).send(ResponseModel.failureResponse(error.message));
  }
};
