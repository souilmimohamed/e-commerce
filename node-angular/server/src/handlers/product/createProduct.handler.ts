import Product from "../../schemas/product.schema";
import { IHandle, ProductModel, ResponseModel } from "../../shared/models";

export class CreateProductHandler implements IHandle<ResponseModel<boolean>> {
  private _data: ProductModel;
  constructor(product: ProductModel) {
    this._data = product;
  }

  async handle(): Promise<ResponseModel<boolean>> {
    try {
      let validation = await this.validate();
      if (!validation.Success) {
        return ResponseModel.failureResponse<boolean>(validation.Errors);
      }

      const newProduct = new Product(this._data);
      await newProduct.save();
      return ResponseModel.successResponse<boolean>(true);
    } catch (error: any) {
      return ResponseModel.failureResponse<boolean>([error.message]);
    }
  }

  async validate(): Promise<ResponseModel<boolean>> {
    return ResponseModel.validationResponse<boolean>();
  }
}
