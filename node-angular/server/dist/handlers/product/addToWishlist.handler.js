"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToWishlistHandler = void 0;
const product_schema_1 = __importDefault(require("../../schemas/product.schema"));
const wishlist_schema_1 = __importDefault(require("../../schemas/wishlist.schema"));
const models_1 = require("../../shared/models");
class AddToWishlistHandler {
    constructor(data) {
        this._data = data;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield this.validate();
                if (!validation.Success) {
                    return models_1.ResponseModel.failureResponse(validation.Errors);
                }
                const { idProduct, idUser } = this._data;
                const product = (yield product_schema_1.default.findById(idProduct));
                if (product) {
                    let item = {
                        idProduct: product._id,
                        idUser: idUser,
                        inStock: product.countInStock > 0,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                    };
                    let wishlistItem = new wishlist_schema_1.default(item);
                    yield wishlistItem.save();
                    return models_1.ResponseModel.successResponse(true);
                }
                else
                    return models_1.ResponseModel.failureResponse(["product not found"]);
            }
            catch (error) {
                return models_1.ResponseModel.failureResponse([error.message]);
            }
        });
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.ResponseModel.validationResponse();
        });
    }
}
exports.AddToWishlistHandler = AddToWishlistHandler;
