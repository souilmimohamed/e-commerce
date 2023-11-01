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
exports.LoginHandler = void 0;
const user_schema_1 = __importDefault(require("../../schemas/user.schema"));
const models_1 = require("../../shared/models");
const tokenGenerator_1 = require("../../shared/utils/tokenGenerator");
class LoginHandler {
    constructor(credentials) {
        this._data = credentials;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield this.validate();
                if (!validation.Success) {
                    return models_1.ResponseModel.failureResponse(validation.Errors);
                }
                const { email, password } = this._data;
                const user = (yield user_schema_1.default.findOne({ email }));
                if (user && user.password === password) {
                    const token = (0, tokenGenerator_1.generateToken)(user);
                    return models_1.ResponseModel.successResponse(token);
                }
                else
                    return models_1.ResponseModel.failureResponse(["Wrong credentials"]);
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
exports.LoginHandler = LoginHandler;
