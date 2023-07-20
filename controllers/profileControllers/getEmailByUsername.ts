import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import UserModel from "../../models/UserModel";

interface GetEmailByUsernameResponse {
  success: boolean;
  message: string;
  email: string;
}

const responseObject: GetEmailByUsernameResponse = {
  success: false,
  message: "",
  email: "",
};

export const getEmailByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    if (!username) {
      responseObject.message = "Username is required";
      return res.status(401).json(responseObject);
    }

    const response = (await UserModel.findOne({
      username,
    })) as UserModelResponse | null;

    responseObject.success = true;
    responseObject.message = "Email fetched successfully";
    responseObject.email = response?.email!;
    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    responseObject.email = "";
    if (error instanceof MongooseError) {
      responseObject.message =
        error.name === "CastError" ? "Invalid username" : error.message;
      return res.status(401).json(responseObject);
    }
    if (error instanceof Error) {
      responseObject.message = error.message;
      return res.status(500).json(responseObject);
    }
  }
};
