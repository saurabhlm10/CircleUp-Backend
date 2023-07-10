import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/******************************************************
 * @REGISTER
 * @route /api/auth/register
 * @description User register Controller for creating new user
 * @parameters username, email, password
 * @returns Token as cookie
 * @algo algorithm
 *  Collect info
 *  Check if all fields are provided
 *  Check if user already exists or not
 *  Check if username available
 *  Encrypt password
 *  Create a new entry in db
 *  Sign the Token and send
 ******************************************************/

interface Register extends Login {
  email: string;
}

export const registerController = async (req: Request, res: Response) => {
  try {
    // Collect info
    let { username, email, password }: Register = req.body;

    const responseObject: RegisterResponseModel = {
      success: false,
      message: "",
      id: "",
    };

    // Check if all fields are provided
    if (!(username && email && password)) {
      responseObject.message = "All fields are required";
      return res.status(401).json(responseObject);
    }

    // Check if user already exists or not
    const userAlreadyExists = (await UserModel.findOne({
      email,
    })) as UserModelType | null;
    if (userAlreadyExists) {
      responseObject.message = "This Email Is Already Registered";

      return res.status(402).json(responseObject);
    }

    // Check if username available
    const usernameAvailable = (await UserModel.findOne({
      username,
    })) as UserModelType | null;

    if (usernameAvailable) {
      responseObject.message = "Username not available";

      return res.status(403).json(responseObject);
    }

    // encrypt password
    const myEnPassword: string = bcrypt.hashSync(password, 10);

    console.log("myEnPassword", myEnPassword);

    // Create a new entry in db
    const user = (await UserModel.create({
      username,
      email,
      password: myEnPassword,
    })) as UserModelType | null;

    // Sign the Token
    jwt.sign(
      { userId: user?._id, email },
      process.env.SECRET!,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        responseObject.success = true;
        responseObject.message = "User registered successfully";
        responseObject.id = user?._id;

        res
          .cookie("token", token, { secure: true })
          .status(200)
          .json(responseObject);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
