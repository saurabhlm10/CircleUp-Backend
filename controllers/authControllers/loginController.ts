import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/******************************************************
 * @LOGIN
 * @route /api/auth/login
 * @description User login Controller for loggin in user
 * @parameters username, password
 * @returns user, token
 * @algo algorithm
 *  Collect info
 *  Check if all fields are provided
 *  Check if user already exists or not
 *  Check if password is correct
 *  Sign the Token
 *  Send User and Token
 ******************************************************/

export const loginController = async (req: Request, res: Response) => {
  try {
    // Collect info
    const { username, password }: Login = req.body;

    const responseObject: LoginResponseModel = {
      success: false,
      message: "",
      user: {},
    };

    // Check if all fields are provided
    if (!(username && password)) {
      responseObject.message = "Email and Password are Required";
      return res.status(401).json(responseObject);
    }

    // Check if user already exists or not
    const user = (await UserModel.findOne({
      username,
    })) as UserModelType | null;

    if (!user) {
      responseObject.message = "User Is Not Registered";
      return res.status(402).json(responseObject);
    }

    // Check if password is correct
    const checkPassword: boolean = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!checkPassword) {
      responseObject.message = "Password Is Incorrect";
      return res.status(403).json(responseObject);
    }

    // Sign token
    const token: string = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username,
      },
      process.env.SECRET!,
      {
        expiresIn: "24h",
      }
    );

    user.password = undefined;

    // user.token = token;

    responseObject.success = true;
    responseObject.message = "User logged in successfully";
    responseObject.user = user;

    // Send User and Token
    return res
      .cookie("token", token, {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        sameSite: "none",
      })
      .status(200)
      .json(responseObject);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};
