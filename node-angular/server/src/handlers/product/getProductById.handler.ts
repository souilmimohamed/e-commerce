import Product from "../../schemas/product.schema";
import { IHandle, ProductModel, ResponseModel } from "../../shared/models";

export class GetProductByIdHandler
  implements IHandle<ResponseModel<ProductModel>>
{
  private _data: string;
  constructor(_id: string) {
    this._data = _id;
  }
  async handle(): Promise<ResponseModel<ProductModel>> {
    try {
      let validation = await this.validate();
      if (!validation.Success) {
        return ResponseModel.failureResponse<ProductModel>(validation.Errors);
      }
      let product = (await Product.findById(this._data)) as ProductModel;
      return ResponseModel.successResponse<ProductModel>(product);
    } catch (error: any) {
      return ResponseModel.failureResponse<ProductModel>([error.message]);
    }
  }
  async validate(): Promise<ResponseModel<ProductModel>> {
    return ResponseModel.validationResponse<ProductModel>();
  }
}
