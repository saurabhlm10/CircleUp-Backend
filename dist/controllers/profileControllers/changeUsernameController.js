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
exports.changeUsernameController = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const changeUsernameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, newUsername } = req.body;
        const responseObject = {
            success: false,
            message: "",
            newUsername: "",
        };
        if (!username) {
            responseObject.message = "Username is missing";
            res.status(401).json(responseObject);
        }
        const response = yield UserModel_1.default.findOneAndUpdate({ username }, { username: newUsername });
        res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.changeUsernameController = changeUsernameController;
