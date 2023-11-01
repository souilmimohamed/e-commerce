"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleException = void 0;
const models_1 = require("../models");
const logger_1 = __importDefault(require("./logger"));
const handleException = (request, error) => {
    logger_1.default.logRequestError(request, error);
    return models_1.ResponseModel.failureResponse([error.message]);
};
exports.handleException = handleException;
