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
exports.loginController = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/******************************************************
 * @LOGIN
 * @route /api/auth/login
 * @description User login Controller for loggin in user
 * @parameters username, password
 * @returns user, token
 * @algo algorithm
 *  Collect info
 *  Check if all fields are provided
 *  Check if user already exists or not
 *  Check if password is correct
 *  Sign the Token
 *  Send User and Token
 ******************************************************/
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Collect info
        const { username, password } = req.body;
        const responseObject = {
            success: false,
            message: "",
            user: {},
        };
        // Check if all fields are provided
        if (!(username && password)) {
            responseObject.message = "Email and Password are Required";
            return res.status(401).json(responseObject);
        }
        // Check if user already exists or not
        const user = (yield UserModel_1.default.findOne({
            username,
        }));
        if (!user) {
            responseObject.message = "User Is Not Registered";
            return res.status(402).json(responseObject);
        }
        // Check if password is correct
        const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!checkPassword) {
            responseObject.message = "Password Is Incorrect";
            return res.status(403).json(responseObject);
        }
        // Sign token
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            username,
        }, process.env.SECRET, {
            expiresIn: "24h",
        });
        user.password = undefined;
        user.token = token;
        responseObject.success = true;
        responseObject.message = "User logged in successfully";
        responseObject.user = user;
        // Send User and Token
        return res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, message: "Something went wrong", error });
    }
});
exports.loginController = loginController;
