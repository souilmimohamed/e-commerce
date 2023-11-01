"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userShema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    fullname: String,
    isAdmin: Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const User = mongoose_1.default.model("User", userShema);
exports.default = User;
