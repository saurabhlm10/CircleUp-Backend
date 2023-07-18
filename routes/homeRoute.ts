import express, { Express, Request, Response, Router } from "express";

const router: Router = express.Router();

interface HomeResponse {
  success: boolean;
  message: string;
}

const responseObject: HomeResponse = {
  success: false,
  message: "",
};

router.get("/", (req: Request, res: Response) => {
  responseObject.message = "hello frontend";
  res.status(200).json(responseObject);
});

router.get("/hello", (req: Request, res: Response) => {
  responseObject.message = "hello to frontend";

  res.status(200).json(responseObject);
});

export default router;
