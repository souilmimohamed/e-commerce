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
exports.GetProductsHandler = void 0;
const product_schema_1 = __importDefault(require("../../schemas/product.schema"));
const models_1 = require("../../shared/models");
class GetProductsHandler {
    constructor(filter) {
        this._data = filter;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield this.validate();
                if (!validation.Success) {
                    return models_1.ResponseModel.failureResponse(validation.Errors);
                }
                const { searchText, category, brand, sortPrice, requestedPage, itemsPerPage, } = this._data;
                //set paging value
                let FirstRowNumber = itemsPerPage > 0 ? requestedPage * itemsPerPage : 0;
                let RequestRows = itemsPerPage;
                let _sort = sortPrice && sortPrice === "a"
                    ? (a, b) => (a.price > b.price ? 1 : -1)
                    : (a, b) => (a.price > b.price ? -1 : 1);
                //getting data
                const count = yield product_schema_1.default.count();
                let Products = yield product_schema_1.default.find({
                    $and: [
                        { name: new RegExp(searchText, "i") },
                        { category: new RegExp(category, "i") },
                        { brand: new RegExp(brand, "i") },
                    ],
                })
                    .skip(FirstRowNumber)
                    .limit(RequestRows);
                if (_sort)
                    Products = Products.sort(_sort);
                const response = {
                    count: count,
                    items: Products,
                    itemsPerPage: itemsPerPage,
                    requestedPage: requestedPage,
                };
                return models_1.ResponseModel.successResponse(response);
            }
            catch (error) {
                return models_1.ResponseModel.failureResponse([
                    error.message,
                ]);
            }
        });
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.ResponseModel.validationResponse();
        });
    }
}
exports.GetProductsHandler = GetProductsHandler;
