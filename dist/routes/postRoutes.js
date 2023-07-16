"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const createPost_1 = require("../controllers/postControllers/createPost");
const router = express_1.default.Router();
router.post("/createpost", cloudinary_1.default.single("image"), createPost_1.createPost);
exports.default = router;
