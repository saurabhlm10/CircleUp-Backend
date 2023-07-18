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
exports.getProfileByEmailController = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const mongoose_1 = require("mongoose");
const responseObject = {
    success: false,
    message: "",
    user: {},
};
const getProfileByEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Collect info
        const { profileEmail } = req.params;
        console.log(profileEmail);
        // Check if all fields are provided
        if (!profileEmail) {
            responseObject.message = "Email is required";
            return res.status(401).json(responseObject);
        }
        const user = (yield UserModel_1.default.findOne({
            email: profileEmail,
        }));
        // Check if user already exists or not
        if (!user) {
            responseObject.message = "Email is not registered";
            return res.status(401).json(responseObject);
        }
        user.password = undefined;
        responseObject.success = true;
        responseObject.message = "Profile fetched successfully";
        responseObject.user = user;
        // Send Profile
        return res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        responseObject.user = {};
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
exports.getProfileByEmailController = getProfileByEmailController;
