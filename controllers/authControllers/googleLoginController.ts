import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import Jwt, { JsonWebTokenError } from "jsonwebtoken";

interface GoogleLoginResponse {
  success: boolean;
  message: string;
}

const responseObject: GoogleLoginResponse = {
  success: false,
  message: "",
};

export const googleLoginController = async (req: Request, res: Response) => {
  try {
    // console.log(req.user);
    // let user : GoogleProfile
    const { user } = req;

    console.log(user)

    if (!user) {
      responseObject.message = "No user received";
      return res.status(401).json(responseObject);
    }

    let token: string;

    token = Jwt.sign(
      {
        email: user,
      },
      process.env.SECRET!,
      {
        expiresIn: "24h",
      }
    );

    responseObject.success = true;
    responseObject.message = "Token sent as cookie";

    return res
      .cookie("token", token!, {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        sameSite: "lax", // Set SameSite attribute to Lax
        secure: true, // Set secure attribute for HTTPS
        httpOnly: true, // Use httpOnly for enhanced security
        path: "/",
        // sameSite: "strict",
        // secure: true,
      })
      .status(200)
      .json(responseObject);
  } catch (error) {
    console.log(error);
    if (error instanceof JsonWebTokenError) {
      responseObject.message = error.message;
      return res.status(401).json(responseObject);
    }
    if (error instanceof Error) {
      responseObject.message = error.message;
      return res.status(500).json(responseObject);
    }
  }
};
