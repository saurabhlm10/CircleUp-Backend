import express, { Express, Request, Response, Router } from "express";
import { addRemoveFollower } from "../controllers/followControllers/addRemoveFollower";

const router: Router = express.Router();

router.put(
  "/addremovefollower/:userEmail/:foreignUserEmail",
  addRemoveFollower
);

export default router;
