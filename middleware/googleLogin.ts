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

export const googleLogin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;

  if (!token) {
    responseObject.message = "Token Missing";
    return res.status(401).json(responseObject);
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET!) as GoogleProfile;

    req.user = decode as GoogleProfile;
    return next();
  } catch (error) {
    if (error instanceof Error) {
      responseObject.message = "Token Invalid";
      res.status(401).json(responseObject);
    }
  }
};
