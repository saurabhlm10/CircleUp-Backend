import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT!;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + cript Serer");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
