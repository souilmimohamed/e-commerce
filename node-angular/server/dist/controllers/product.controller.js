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
exports.getWishlist = exports.addToWishlist = exports.createProduct = exports.getProductsById = exports.getProducts = void 0;
const models_1 = require("../shared/models");
const exceptionhandler_1 = require("../shared/utils/exceptionhandler");
const product_1 = require("../handlers/product");
const addToWishlist_handler_1 = require("../handlers/product/addToWishlist.handler");
const getWishlist_handler_1 = require("../handlers/product/getWishlist.handler");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.body;
        let response = yield new product_1.GetProductsHandler(filter).handle();
        res.status(200).send(response);
    }
    catch (error) {
        (0, exceptionhandler_1.handleException)(req, error);
        res.status(404).send(models_1.ResponseModel.failureResponse(error.message));
    }
});
exports.getProducts = getProducts;
const getProductsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let response = yield new product_1.GetProductByIdHandler(id).handle();
        res.status(200).send(response);
    }
    catch (error) {
        (0, exceptionhandler_1.handleException)(req, error);
        res.status(404).send(models_1.ResponseModel.failureResponse(error.message));
    }
});
exports.getProductsById = getProductsById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        let response = yield new product_1.CreateProductHandler(product).handle();
        res.status(200).send(response);
    }
    catch (error) {
        (0, exceptionhandler_1.handleException)(req, error);
        res.status(404).send(models_1.ResponseModel.failureResponse(error.message));
    }
});
exports.createProduct = createProduct;
const addToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlistRequest = req.body;
        let response = yield new addToWishlist_handler_1.AddToWishlistHandler(wishlistRequest).handle();
        res.status(200).send(response);
    }
    catch (error) {
        (0, exceptionhandler_1.handleException)(req, error);
        res.status(404).send(models_1.ResponseModel.failureResponse(error.message));
    }
});
exports.addToWishlist = addToWishlist;
const getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("authorization");
        console.log(token);
        let response = yield new getWishlist_handler_1.GetWishlistHandler().handle();
        res.status(200).send(response);
    }
    catch (error) {
        (0, exceptionhandler_1.handleException)(req, error);
        res.status(404).send(models_1.ResponseModel.failureResponse(error.message));
    }
});
exports.getWishlist = getWishlist;
