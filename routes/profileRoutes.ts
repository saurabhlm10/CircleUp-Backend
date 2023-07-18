import express, { Router } from "express";
import { getProfileByEmailController } from "../controllers/profileControllers/getProfileByEmail";
import { changeUsernameController } from "../controllers/profileControllers/changeUsernameController";
import { searchProfile } from "../controllers/profileControllers/searchProfile";

const router: Router = express.Router();

router.get("/getProfileByEmail/:profileEmail", getProfileByEmailController);
router.post("/changeusername", changeUsernameController);
router.get("/searchprofile/:searchTerm", searchProfile);


export default router;
