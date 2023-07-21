"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../controllers/authControllers/loginController");
const registerController_1 = require("../controllers/authControllers/registerController");
const checkUsernameController_1 = require("../controllers/authControllers/checkUsernameController");
const googleLoginController_1 = require("../controllers/authControllers/googleLoginController");
const googleLogin_1 = require("../middleware/googleLogin");
const router = express_1.default.Router();
router.post("/login", loginController_1.loginController);
router.post("/register", registerController_1.registerController);
router.post("/checkusername", checkUsernameController_1.checkUsernameController);
router.get("/googlelogin", googleLogin_1.googleLogin, googleLoginController_1.googleLoginController);
exports.default = router;
