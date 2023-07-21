import express, { Express, Request, Response, Router } from "express";
import { loginController } from "../controllers/authControllers/loginController";
import { registerController } from "../controllers/authControllers/registerController";
import { checkUsernameController } from "../controllers/authControllers/checkUsernameController";
import { googleLoginController } from "../controllers/authControllers/googleLoginController";
import { googleLogin } from "../middleware/googleLogin";

const router: Router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/checkusername", checkUsernameController);
router.get("/googlelogin", googleLogin, googleLoginController);

export default router;
