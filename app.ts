require("dotenv").config();
import express, { Express, Request, Response } from "express";
import connectToDb from "./config/db";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import homeRoute from "./routes/homeRoute";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import postRoutes from "./routes/postRoutes";
import followRoutes from "./routes/followRoutes";
import { auth } from "./middleware/auth";

const app: Express = express();

connectToDb();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", homeRoute);
app.use("/api/auth", authRoutes);
app.use("/api/profile", auth, profileRoutes);
app.use("/api/post", auth, postRoutes);
app.use("/api/follow", auth, followRoutes);

export default app;
