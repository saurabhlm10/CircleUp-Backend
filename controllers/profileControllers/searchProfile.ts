import { Request, Response } from "express";

import UserModel from "../../models/UserModel";
import { MongooseError } from "mongoose";

interface SearchUserResponse {
  success: boolean;
  message: string;
  users: [UserModelResponse] | [];
}

const responseObject: SearchUserResponse = {
  success: false,
  message: "",
  users: [],
};

export const searchProfile = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.params;

    if (!searchTerm) {
      responseObject.message = "Search Term Missing";
      return res.status(401).json(responseObject);
    }

    const searchResults = await UserModel.find({
      username: new RegExp(searchTerm, "i"),
    });

    responseObject.success = true;
    responseObject.message = "Users Search Successfully";
    responseObject.users = searchResults;

    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    responseObject.users = [];
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
