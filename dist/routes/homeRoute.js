"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const responseObject = {
    success: false,
    message: "",
};
router.get("/", (req, res) => {
    responseObject.message = "hello frontend";
    res.status(200).json(responseObject);
});
router.get("/hello", (req, res) => {
    responseObject.message = "hello to frontend";
    res.status(200).json(responseObject);
});
exports.default = router;
