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
exports.addComment = void 0;
const PostModel_1 = __importDefault(require("../../models/PostModel"));
const mongoose_1 = require("mongoose");
const responseObject = {
    success: false,
    message: "",
    post: {},
};
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, postId } = req.params;
        const { comment } = req.body;
        if (!(userEmail && postId && comment)) {
            responseObject.message = "userEmail, postId, comment is required";
            return res.status(401).json(responseObject);
        }
        const commentObject = {
            comment,
            userEmail,
        };
        const addCommentResponse = (yield PostModel_1.default.findByIdAndUpdate({ _id: postId }, { $push: { comments: commentObject }, $set: { created_at: new Date() } }, { new: true }));
        responseObject.success = true;
        responseObject.message = "Added comment successfully";
        responseObject.post = addCommentResponse;
        return res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        responseObject.post = {};
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
exports.addComment = addComment;
