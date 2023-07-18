import express, { Router } from "express";
import upload from "../utils/cloudinary";
import { createPost } from "../controllers/postControllers/createPost";
import { getPosts } from "../controllers/postControllers/getPosts";
import { getUserPosts } from "../controllers/postControllers/getUserPosts";
import { deletePost } from "../controllers/postControllers/deletePost";
import { getPost } from "../controllers/postControllers/getPost";
import { likePost } from "../controllers/postControllers/likePost";
import { addComment } from "../controllers/postControllers/addComment";
import { deleteComment } from "../controllers/postControllers/deleteComment";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.post("/createpost", upload.single("image"), createPost);
router.get("/getposts/:followersArray", getPosts);
router.get("/getuserposts/:userEmail", getUserPosts);
router.delete("/deletepost/:postId", deletePost);
router.get("/getpost/:postId", getPost);
router.put("/likepost/:userEmail/:postId", likePost);
router.post("/addcomment/:userEmail/:postId", addComment);
router.delete("/deletecomment/:commentId/:postId", deleteComment);

export default router;
