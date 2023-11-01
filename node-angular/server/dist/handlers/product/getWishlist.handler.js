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
exports.GetWishlistHandler = void 0;
const wishlist_schema_1 = __importDefault(require("../../schemas/wishlist.schema"));
const models_1 = require("../../shared/models");
class GetWishlistHandler {
    // private _data: string;
    constructor( /*_id: string*/) {
        // this._data = _id;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield this.validate();
                if (!validation.Success) {
                    return models_1.ResponseModel.failureResponse(validation.Errors);
                }
                let wishlist = yield wishlist_schema_1.default.find({});
                return models_1.ResponseModel.successResponse(wishlist);
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
exports.GetWishlistHandler = GetWishlistHandler;
