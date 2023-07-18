import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

interface MiddlewareResponse {
  success: boolean;
  message: string;
}

const responseObject: MiddlewareResponse = {
  success: false,
  message: "",
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    responseObject.message = "Token Missing";
    return res.status(401).json(responseObject);
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET!);

    req.user = decode;
    return next();
  } catch (error) {
    if (error instanceof Error) {
      responseObject.message = "Token Missing";
      res.status(403).json(responseObject);
    }
  }
};
