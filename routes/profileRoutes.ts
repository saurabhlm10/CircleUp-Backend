import express, { Router } from "express";
import { getProfileByEmailController } from "../controllers/profileControllers/getProfileByEmail";
import { changeUsernameController } from "../controllers/profileControllers/changeUsernameController";

const router: Router = express.Router();

router.get("/getProfileByEmail/:profileEmail", getProfileByEmailController);
router.post("/changeusername", changeUsernameController);

export default router;
