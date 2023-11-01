import Product from "../../schemas/product.schema";
import Wishlist from "../../schemas/wishlist.schema";
import {
  IHandle,
  ProductModel,
  ResponseModel,
  wishlistItem,
  wishlistRequestModel,
} from "../../shared/models";

export class AddToWishlistHandler
  implements IHandle<ResponseModel<wishlistItem>>
{
  private _data: wishlistRequestModel;
  constructor(data: wishlistRequestModel) {
    this._data = data;
  }

  async handle(): Promise<ResponseModel<wishlistItem>> {
    try {
      let validation = await this.validate();
      if (!validation.Success) {
        return ResponseModel.failureResponse<wishlistItem>(validation.Errors);
      }
      const { idProduct, idUser } = this._data;
      const product = (await Product.findById(idProduct)) as ProductModel;
      if (product) {
        let item = {
          idProduct: product._id,
          idUser: idUser,
          inStock: product.countInStock > 0,
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
        };
        let wishlistItem = new Wishlist(item);
        await wishlistItem.save();
        return ResponseModel.successResponse<wishlistItem>(wishlistItem);
      } else
        return ResponseModel.failureResponse<wishlistItem>([
          "product not found",
        ]);
    } catch (error: any) {
      return ResponseModel.failureResponse<wishlistItem>([error.message]);
    }
  }

  async validate(): Promise<ResponseModel<wishlistItem>> {
    const { idProduct, idUser } = this._data;
    let check = (await Wishlist.find({
      idProduct: idProduct,
      idUser: idUser,
    })) as wishlistItem[];
    if (check && check.length)
      return ResponseModel.failureResponse<wishlistItem>([
        "Product already in wishlist",
      ]);
    return ResponseModel.validationResponse<wishlistItem>();
  }
}
