"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getProfileByEmail_1 = require("../controllers/profileControllers/getProfileByEmail");
const changeUsernameController_1 = require("../controllers/profileControllers/changeUsernameController");
const searchProfile_1 = require("../controllers/profileControllers/searchProfile");
const getEmailByUsername_1 = require("../controllers/profileControllers/getEmailByUsername");
const router = express_1.default.Router();
router.get("/getProfileByEmail/:profileEmail", getProfileByEmail_1.getProfileByEmailController);
router.post("/changeusername", changeUsernameController_1.changeUsernameController);
router.get("/searchprofile/:searchTerm", searchProfile_1.searchProfile);
router.get("/getEmailByUsername/:username", getEmailByUsername_1.getEmailByUsername);
exports.default = router;
