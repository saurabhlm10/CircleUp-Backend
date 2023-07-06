"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: [true, "username is required"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: [true, "email is required"],
        trim: true,
    },
    password: {
        type: String,
        require: [true, "email is required"],
        trim: true,
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    token: {
        type: String,
        trim: true,
    },
});
userSchema.set("timestamps", true);
exports.default = mongoose.model("user", userSchema);
