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
exports.getEmailByUsername = void 0;
const mongoose_1 = require("mongoose");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const responseObject = {
    success: false,
    message: "",
    email: "",
};
const getEmailByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        if (!username) {
            responseObject.message = "Username is required";
            return res.status(401).json(responseObject);
        }
        const response = (yield UserModel_1.default.findOne({
            username,
        }));
        responseObject.success = true;
        responseObject.message = "Email fetched successfully";
        responseObject.email = response === null || response === void 0 ? void 0 : response.email;
        return res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        responseObject.email = "";
        if (error instanceof mongoose_1.MongooseError) {
            responseObject.message =
                error.name === "CastError" ? "Invalid username" : error.message;
            return res.status(401).json(responseObject);
        }
        if (error instanceof Error) {
            responseObject.message = error.message;
            return res.status(500).json(responseObject);
        }
    }
});
exports.getEmailByUsername = getEmailByUsername;
