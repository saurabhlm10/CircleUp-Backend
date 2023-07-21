"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.googleLoginController = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const responseObject = {
    success: false,
    message: "",
};
const googleLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.user);
        // let user : GoogleProfile
        const { user } = req;
        console.log(user);
        if (!user) {
            responseObject.message = "No user received";
            return res.status(401).json(responseObject);
        }
        let token;
        token = jsonwebtoken_1.default.sign({
            email: user,
        }, process.env.SECRET, {
            expiresIn: "24h",
        });
        responseObject.success = true;
        responseObject.message = "Token sent as cookie";
        return res
            .cookie("token", token, {
            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            sameSite: "lax",
            secure: true,
            httpOnly: true,
            path: "/",
            // sameSite: "strict",
            // secure: true,
        })
            .status(200)
            .json(responseObject);
    }
    catch (error) {
        console.log(error);
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            responseObject.message = error.message;
            return res.status(401).json(responseObject);
        }
        if (error instanceof Error) {
            responseObject.message = error.message;
            return res.status(500).json(responseObject);
        }
    }
});
exports.googleLoginController = googleLoginController;
