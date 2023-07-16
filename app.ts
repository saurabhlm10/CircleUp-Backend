require("dotenv").config();
import express, { Express, Request, Response } from "express";
import connectToDb from "./config/db";
import cors from "cors";
import morgan from "morgan";
import homeRoute from "./routes/homeRoute";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import postRoutes from "./routes/postRoutes";

const app: Express = express();

connectToDb();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", homeRoute);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);

export default app;
