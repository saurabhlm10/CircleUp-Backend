"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseObject = {
    success: false,
    message: "",
};
const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        responseObject.message = "Token Missing";
        return res.status(401).json(responseObject);
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.user = decode;
        return next();
    }
    catch (error) {
        if (error instanceof Error) {
            responseObject.message = "Token Missing";
            res.status(403).json(responseObject);
        }
    }
};
exports.auth = auth;
