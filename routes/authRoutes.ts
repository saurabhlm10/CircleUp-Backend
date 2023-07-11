import express, { Express, Request, Response, Router } from "express";
import { loginController } from "../controllers/authControllers/loginController";
import { registerController } from "../controllers/authControllers/registerController";
import { checkUsernameController } from "../controllers/authControllers/checkUsernameController";

const router: Router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/createusername", checkUsernameController);

export default router;
