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
exports.googleLoginController = void 0;
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseObject = {
    success: false,
    message: "",
};
const googleLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        // let user : GoogleProfile
        const { user } = req;
        if (!user) {
            responseObject.message = 'No user received';
            return res.status(401).json(responseObject);
        }
        let token;
        if (typeof user === "object" && "email" in user) {
            // Extract the email from the user object
            const email = user.email;
            // Rest of your code
            token = jsonwebtoken_1.default.sign({
                email, // Use the extracted email
            }, process.env.SECRET, {
                expiresIn: "24h",
            });
        }
        return res
            .cookie("token", token, {
            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            sameSite: "none",
            secure: true,
        })
            .status(200)
            .json(responseObject);
    }
    catch (error) {
        console.log(error);
        if (error instanceof mongoose_1.MongooseError) {
            responseObject.message =
                error.name === "CastError" ? "Invalid followersArray" : error.message;
            return res.status(401).json(responseObject);
        }
        if (error instanceof Error) {
            responseObject.message = error.message;
            return res.status(500).json(responseObject);
        }
    }
});
exports.googleLoginController = googleLoginController;
