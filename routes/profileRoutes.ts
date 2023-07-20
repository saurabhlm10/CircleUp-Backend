import express, { Router } from "express";
import { getProfileByEmailController } from "../controllers/profileControllers/getProfileByEmail";
import { changeUsernameController } from "../controllers/profileControllers/changeUsernameController";
import { searchProfile } from "../controllers/profileControllers/searchProfile";
import { getEmailByUsername } from "../controllers/profileControllers/getEmailByUsername";

const router: Router = express.Router();

router.get("/getProfileByEmail/:profileEmail", getProfileByEmailController);
router.post("/changeusername", changeUsernameController);
router.get("/searchprofile/:searchTerm", searchProfile);
router.get("/getEmailByUsername/:username", getEmailByUsername);

export default router;
