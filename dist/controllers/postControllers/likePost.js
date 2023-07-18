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
exports.likePost = void 0;
const PostModel_1 = __importDefault(require("../../models/PostModel"));
const mongoose_1 = require("mongoose");
const responseObject = {
    success: false,
    message: "",
    post: {},
};
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const { userEmail, postId } = req.params;
        if (!(userEmail && postId)) {
            responseObject.message = "username and postId are required";
            return res.status(401).json(responseObject);
        }
        const { likes } = (yield PostModel_1.default.findById({
            _id: postId,
        }));
        if (likes.includes(userEmail)) {
            responseObject.post = (yield PostModel_1.default.findOneAndUpdate({ _id: postId }, {
                $pull: { likes: userEmail },
            }, {
                new: true,
            }));
            responseObject.message = "removed like successfully";
        }
        else {
            responseObject.post = (yield PostModel_1.default.findOneAndUpdate({ _id: postId }, {
                $addToSet: { likes: userEmail },
            }, {
                new: true,
            }));
            responseObject.message = "added like successfully";
        }
        responseObject.success = true;
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
exports.likePost = likePost;
