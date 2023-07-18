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
exports.getUserPosts = void 0;
const PostModel_1 = __importDefault(require("../../models/PostModel"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const mongoose_1 = require("mongoose");
const responseObject = {
    success: false,
    message: "",
    posts: [],
};
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail } = req.params;
        if (!userEmail) {
            responseObject.message = "No User Email Provided";
            return res.status(401).json(responseObject);
        }
        const user = (yield UserModel_1.default.findOne({
            email: userEmail,
        }));
        if (!user) {
            responseObject.message = "User doesn't Exist";
            return res.status(401).json(responseObject);
        }
        let posts = yield PostModel_1.default.find({ userEmail });
        posts = posts.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
        });
        responseObject.success = true;
        responseObject.message = "Got posts successfully";
        responseObject.posts = posts;
        return res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        responseObject.posts = [];
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
exports.getUserPosts = getUserPosts;
