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
exports.searchProfile = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const mongoose_1 = require("mongoose");
const responseObject = {
    success: false,
    message: "",
    users: [],
};
const searchProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.params;
        if (!searchTerm) {
            responseObject.message = "Search Term Missing";
            return res.status(401).json(responseObject);
        }
        const searchResults = yield UserModel_1.default.find({
            username: new RegExp(searchTerm, "i"),
        });
        responseObject.success = true;
        responseObject.message = "Users Search Successfully";
        responseObject.users = searchResults;
        return res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        responseObject.users = [];
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
exports.searchProfile = searchProfile;
