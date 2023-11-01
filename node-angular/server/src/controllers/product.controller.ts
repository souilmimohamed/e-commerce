import { Request, Response } from "express";
import {
  ProductModel,
  ResponseModel,
  productsRequestModel,
  wishlistRequestModel,
} from "../shared/models";
import { handleException } from "../shared/utils/exceptionhandler";
import {
  GetProductsHandler,
  GetProductByIdHandler,
  CreateProductHandler,
} from "../handlers/product";
import { AddToWishlistHandler } from "../handlers/product/addToWishlist.handler";
import { GetWishlistHandler } from "../handlers/product/getWishlist.handler";
import { getHeaderFromToken } from "../shared/utils/tokenGenerator";
import { DeleteFromWishlistHandler } from "../handlers/product/deleteFromWishlist.handler";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const filter: productsRequestModel = req.body;
    let response = await new GetProductsHandler(filter).handle();
    res.status(200).send(response);
  } catch (error: any) {
    handleException(req, error);
    res.status(404).send(ResponseModel.failureResponse(error.message));
  }
};

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let response = await new GetProductByIdHandler(id).handle();
    res.status(200).send(response);
  } catch (error: any) {
    handleException(req, error);
    res.status(404).send(ResponseModel.failureResponse(error.message));
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product: ProductModel = req.body;
    let response = await new CreateProductHandler(product).handle();
    res.status(200).send(response);
  } catch (error: any) {
    handleException(req, error);
    res.status(404).send(ResponseModel.failureResponse(error.message));
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const header = req.header("authorization")?.split(" ");
    const decoded = getHeaderFromToken(header![1]);
    const wishlistRequest: wishlistRequestModel = {
      idProduct: productId,
      idUser: decoded!.user_id,
    };
    let response = await new AddToWishlistHandler(wishlistRequest).handle();
    res.status(200).send(response);
  } catch (error: any) {
    handleException(req, error);
    res.status(404).send(ResponseModel.failureResponse(error.message));
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const header = req.header("authorization")?.split(" ");
    const decoded = getHeaderFromToken(header![1]);
    let response = await new GetWishlistHandler(decoded!.user_id).handle();
    res.status(200).send(response);
  } catch (error: any) {
    handleException(req, error);
    res.status(404).send(ResponseModel.failureResponse(error.message));
  }
};

export const deleteFromWishlist = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    let response = await new DeleteFromWishlistHandler(_id).handle();
    res.status(200).send(response);
  } catch (error: any) {
    handleException(req, error);
    res.status(404).send(ResponseModel.failureResponse(error.message));
  }
};
