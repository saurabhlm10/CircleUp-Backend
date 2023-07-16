import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import PostModel from "../../models/PostModel";

interface AddPostBody {
  userId: string;
  username: string;
}

interface AddPostResponse {
  success: boolean;
  message: string;
  id: string;
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const responseObject: AddPostResponse = {
      success: false,
      message: "",
      id: "",
    };
    if (!req.file) {
      responseObject.message = "File is Required";
      return res.status(401).json(responseObject);
    }

    const { userId, username }: AddPostBody = req.body;

    if (!(userId && username)) {
      responseObject.message = "All fields are Required";
      return res.status(401).json(responseObject);
    }

    const userExists = (await UserModel.find({
      _id: userId,
      username,
    })) as UserModelResponse | null;

    if (!userExists) {
      responseObject.message = "User doesn't exist";
      return res.status(401).json(responseObject);
    }

    const imageUrl: string = req.file.path;

    const post = await PostModel.create({ imageUrl, username, userId });

    responseObject.success = true;
    responseObject.message = "Post Created Successfully";
    responseObject.id = post._id;

    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
