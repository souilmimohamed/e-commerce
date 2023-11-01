import Product from "../../schemas/product.schema";
import {
  IHandle,
  ProductModel,
  ResponseModel,
  productsRequestModel,
  productsResponseModel,
} from "../../shared/models";

export class GetProductsHandler
  implements IHandle<ResponseModel<productsResponseModel>>
{
  private _data: productsRequestModel;
  constructor(filter: productsRequestModel) {
    this._data = filter;
  }
  async handle(): Promise<ResponseModel<productsResponseModel>> {
    try {
      let validation = await this.validate();
      if (!validation.Success) {
        return ResponseModel.failureResponse<productsResponseModel>(
          validation.Errors
        );
      }
      const {
        searchText,
        category,
        brand,
        sortPrice,
        requestedPage,
        itemsPerPage,
      } = this._data;
      //set paging value
      let FirstRowNumber = itemsPerPage > 0 ? requestedPage * itemsPerPage : 0;
      let RequestRows = itemsPerPage;
      let _sort =
        sortPrice && sortPrice === "a"
          ? (a: ProductModel, b: ProductModel) => (a.price > b.price ? 1 : -1)
          : (a: ProductModel, b: ProductModel) => (a.price > b.price ? -1 : 1);
      //getting data
      const count = await Product.count();
      let Products = await Product.find({
        $and: [
          { name: new RegExp(searchText, "i") },
          { category: new RegExp(category, "i") },
          { brand: new RegExp(brand, "i") },
        ],
      })
        .skip(FirstRowNumber)
        .limit(RequestRows);
      if (_sort) Products = Products.sort(_sort);
      const response: productsResponseModel = {
        count: count,
        items: Products,
        itemsPerPage: itemsPerPage,
        requestedPage: requestedPage,
      };
      return ResponseModel.successResponse<productsResponseModel>(response);
    } catch (error: any) {
      return ResponseModel.failureResponse<productsResponseModel>([
        error.message,
      ]);
    }
  }
  async validate(): Promise<ResponseModel<productsResponseModel>> {
    return ResponseModel.validationResponse<productsResponseModel>();
  }
}
