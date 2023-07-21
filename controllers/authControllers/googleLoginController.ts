import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import Jwt from "jsonwebtoken";

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
    console.log(req.user);
    // let user : GoogleProfile
    const { user } = req;

    if(!user) {
        responseObject.message='No user received'
        return res.status(401).json(responseObject)
    }

    let token: string;

    if (typeof user === "object" && "email" in user) {
      // Extract the email from the user object
      const email = user.email;

      // Rest of your code
      token = Jwt.sign(
        {
          email, // Use the extracted email
        },
        process.env.SECRET!,
        {
          expiresIn: "24h",
        }
      );
    }

    return res
      .cookie("token", token!, {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(responseObject);
  } catch (error) {
    console.log(error);
    if (error instanceof MongooseError) {
      responseObject.message =
        error.name === "CastError" ? "Invalid followersArray" : error.message;
      return res.status(401).json(responseObject);
    }
    if (error instanceof Error) {
      responseObject.message = error.message;
      return res.status(500).json(responseObject);
    }
  }
};
