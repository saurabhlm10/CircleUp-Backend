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
exports.createPost = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const PostModel_1 = __importDefault(require("../../models/PostModel"));
const mongoose_1 = require("mongoose");
const responseObject = {
    success: false,
    message: "",
    id: "",
};
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            responseObject.message = "File is Required";
            return res.status(401).json(responseObject);
        }
        const { userId, username, userEmail } = req.body;
        if (!(userId && username && userEmail)) {
            responseObject.message = "All fields are Required";
            return res.status(401).json(responseObject);
        }
        const userExists = (yield UserModel_1.default.findOne({
            _id: userId,
            username,
            email: userEmail,
        }));
        if (!userExists) {
            responseObject.message = "User doesn't exist";
            return res.status(401).json(responseObject);
        }
        const imageUrl = req.file.path;
        const post = (yield PostModel_1.default.create({
            imageUrl,
            username,
            userId,
            userEmail,
        }));
        responseObject.success = true;
        responseObject.message = "Post Created Successfully";
        responseObject.id = post._id;
        return res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        responseObject.id = '';
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
exports.createPost = createPost;
