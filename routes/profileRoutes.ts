import express, { Router } from "express";
import { getProfileByEmailController } from "../controllers/profileControllers/getProfileByEmail";

const router: Router = express.Router();

router.get("/getProfileByEmail/:profileEmail", getProfileByEmailController);

export default router;
