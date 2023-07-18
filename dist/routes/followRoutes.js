"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addRemoveFollower_1 = require("../controllers/followControllers/addRemoveFollower");
const router = express_1.default.Router();
router.put("/addremovefollower/:userEmail/:foreignUserEmail", addRemoveFollower_1.addRemoveFollower);
exports.default = router;
