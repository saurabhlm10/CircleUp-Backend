"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        require: [true, "imageUrl is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "userId is required"],
    },
    userEmail: {
        type: String,
        require: [true, "userEmail is required"],
    },
    username: {
        type: String,
        require: [true, "username is required"],
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [
            {
                comment: {
                    type: String,
                    required: [true, "comment is required"],
                },
                username: {
                    type: String,
                    required: [true, "username is required"],
                },
                userEmail: {
                    type: String,
                    required: [true, "userEmail is required"],
                },
                created_at: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    },
});
postSchema.set("timestamps", true);
exports.default = mongoose.model("post", postSchema);
