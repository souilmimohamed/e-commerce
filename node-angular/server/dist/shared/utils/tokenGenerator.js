"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(user) {
    const token = jsonwebtoken_1.default.sign({ user_id: user._id, email: user.email }, String(process.env.TOKEN_KEY), { expiresIn: "24h" });
    return token;
}
exports.generateToken = generateToken;
