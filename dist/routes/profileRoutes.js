"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getProfileByEmail_1 = require("../controllers/profileControllers/getProfileByEmail");
const router = express_1.default.Router();
router.get("/getProfileByEmail/:profileEmail", getProfileByEmail_1.getProfileByEmailController);
exports.default = router;
