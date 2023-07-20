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
exports.checkUsernameController = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const usernameExistsChecker = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usernameExists = yield UserModel_1.default.findOne({ username });
        return usernameExists ? true : false;
    }
    catch (error) {
        console.log(error);
        return true;
    }
});
const usernameConstructor = (username) => __awaiter(void 0, void 0, void 0, function* () {
    let usernameExists = true;
    let constructedUsername = "";
    while (usernameExists) {
        constructedUsername =
            username.replace(" ", "") +
                String(Math.random() * 100000)
                    .slice(0, 6)
                    .replace(".", "");
        usernameExists = (yield usernameExistsChecker(username)) ? true : false;
    }
    return constructedUsername;
});
const checkUsernameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Googlename } = req.body;
        const responseObject = {
            success: false,
            message: "",
            username: "",
        };
        if (!Googlename) {
            responseObject.message = "Google name is missing";
            return res.status(401).json(responseObject);
        }
        let username;
        username = yield usernameConstructor(Googlename);
        responseObject.success = true;
        responseObject.message = "Username Created Successfully";
        responseObject.username = username;
        return res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, message: "Something went wrong", error });
    }
});
exports.checkUsernameController = checkUsernameController;
