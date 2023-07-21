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
exports.registerController = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Collect info
        let { username, email, password } = req.body;
        const responseObject = {
            success: false,
            message: "",
            id: "",
        };
        // Check if all fields are provided
        if (!(username && email && password)) {
            responseObject.message = "All fields are required";
            return res.status(401).json(responseObject);
        }
        // Check if user already exists or not
        const userAlreadyExists = (yield UserModel_1.default.findOne({
            email,
        }));
        if (userAlreadyExists) {
            responseObject.message = "This Email Is Already Registered";
            return res.status(402).json(responseObject);
        }
        // Check if username available
        const usernameAvailable = (yield UserModel_1.default.findOne({
            username,
        }));
        if (usernameAvailable) {
            responseObject.message = "Username not available";
            return res.status(403).json(responseObject);
        }
        // encrypt password
        const myEnPassword = bcryptjs_1.default.hashSync(password, 10);
        // Create a new entry in db
        const user = (yield UserModel_1.default.create({
            username,
            email,
            password: myEnPassword,
        }));
        // Sign the Token
        jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id, email }, process.env.SECRET, { expiresIn: "24h" }, (err, token) => {
            if (err)
                throw err;
            responseObject.success = true;
            responseObject.message = "User registered successfully";
            responseObject.id = user === null || user === void 0 ? void 0 : user._id;
            res
                .cookie("token", token, {
                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                sameSite: "none",
                secure: true
            })
                .status(200)
                .json(responseObject);
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});
exports.registerController = registerController;
