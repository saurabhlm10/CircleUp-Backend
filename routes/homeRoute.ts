import express, { Express, Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "hello frontend",
  });
});


router.get("/hello", (req: Request, res: Response) => {
  res.status(200).json({
    message: "hello to frontend",
  });
});



export default router;
