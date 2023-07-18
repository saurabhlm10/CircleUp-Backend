import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import PostModel from "../../models/PostModel";
import { MongooseError } from "mongoose";

interface AddPostBody {
  userId: string;
  username: string;
  userEmail: string;
}

interface AddPostResponse {
  success: boolean;
  message: string;
  id: string;
}

const responseObject: AddPostResponse = {
  success: false,
  message: "",
  id: "",
};

export const createPost = async (req: Request, res: Response) => {
  try {
    console.log(req.user);

    if (!req.file) {
      responseObject.message = "File is Required";
      return res.status(401).json(responseObject);
    }

    const { userId, username, userEmail }: AddPostBody = req.body;

    if (!(userId && username && userEmail)) {
      responseObject.message = "All fields are Required";
      return res.status(401).json(responseObject);
    }

    const userExists = (await UserModel.findOne({
      _id: userId,
      username,
      email: userEmail,
    })) as UserModelResponse | null;

    if (!userExists) {
      responseObject.message = "User doesn't exist";
      return res.status(401).json(responseObject);
    }

    const imageUrl: string = req.file.path;

    const post = (await PostModel.create({
      imageUrl,
      username,
      userId,
      userEmail,
    })) as PostModelType;

    responseObject.success = true;
    responseObject.message = "Post Created Successfully";
    responseObject.id = post._id;

    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    responseObject.id = ''
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
