import Wishlist from "../../schemas/wishlist.schema";
import { IHandle, ResponseModel, wishlistItem } from "../../shared/models";

export class GetWishlistHandler
  implements IHandle<ResponseModel<wishlistItem[]>>
{
  private _data: string;
  constructor(_id: string) {
    this._data = _id;
  }
  async handle(): Promise<ResponseModel<wishlistItem[]>> {
    try {
      let validation = await this.validate();
      if (!validation.Success) {
        return ResponseModel.failureResponse<wishlistItem[]>(validation.Errors);
      }

      let wishlist = await Wishlist.find({ idUser: this._data });
      return ResponseModel.successResponse<wishlistItem[]>(wishlist);
    } catch (error: any) {
      return ResponseModel.failureResponse<wishlistItem[]>([error.message]);
    }
  }
  async validate(): Promise<ResponseModel<wishlistItem[]>> {
    return ResponseModel.validationResponse<wishlistItem[]>();
  }
}
