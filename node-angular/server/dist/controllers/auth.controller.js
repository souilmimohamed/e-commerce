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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_1 = require("../handlers/auth");
const models_1 = require("../shared/models");
const exceptionhandler_1 = require("../shared/utils/exceptionhandler");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = req.body;
        let response = yield new auth_1.LoginHandler(credentials).handle();
        res.status(200).send(response);
    }
    catch (error) {
        (0, exceptionhandler_1.handleException)(req, error);
        res.status(404).send(models_1.ResponseModel.failureResponse(error.message));
    }
});
exports.login = login;
