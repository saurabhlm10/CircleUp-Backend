import express, { Router } from "express";
import upload from "../utils/cloudinary";
import { createPost } from "../controllers/postControllers/createPost";

const router: Router = express.Router();

router.post("/createpost", upload.single("image"), createPost);

export default router;
