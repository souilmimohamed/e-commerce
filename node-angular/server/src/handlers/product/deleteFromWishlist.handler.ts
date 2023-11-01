import { it } from "node:test";
import Product from "../../schemas/product.schema";
import Wishlist from "../../schemas/wishlist.schema";
import {
  IHandle,
  ProductModel,
  ResponseModel,
  wishlistItem,
  wishlistRequestModel,
} from "../../shared/models";

export class DeleteFromWishlistHandler
  implements IHandle<ResponseModel<string>>
{
  private _data: string;
  constructor(_id: string) {
    this._data = _id;
  }
  async handle(): Promise<ResponseModel<string>> {
    try {
      let validation = await this.validate();
      if (!validation.Success) {
        return ResponseModel.failureResponse<string>(validation.Errors);
      }
      let item = (await Wishlist.findById(this._data)) as wishlistItem;
      if (item) {
        await Wishlist.findByIdAndDelete(item._id);
        return ResponseModel.successResponse<string>(item._id);
      }
      return ResponseModel.failureResponse<string>(["item not in wishlist"]);
    } catch (error: any) {
      return ResponseModel.failureResponse<string>([error.message]);
    }
  }
  async validate(): Promise<ResponseModel<string>> {
    return ResponseModel.validationResponse<string>();
  }
}
