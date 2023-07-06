import express, { Express, Request, Response, Router } from "express";
import { loginController } from "../controllers/authControllers/loginController";
import { registerController } from "../controllers/authControllers/registerController";

const router: Router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
