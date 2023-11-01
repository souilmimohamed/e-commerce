"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const wishlistShema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    idUser: {
        type: String,
        required: true,
    },
    idProduct: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Wishlist = mongoose_1.default.model("Wishlist", wishlistShema);
exports.default = Wishlist;
