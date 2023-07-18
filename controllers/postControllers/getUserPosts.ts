import { Request, Response } from "express";

import PostModel from "../../models/PostModel";
import UserModel from "../../models/UserModel";
import { MongooseError } from "mongoose";

interface GetUserPostsResponse {
  success: boolean;
  message: string;
  posts: [PostModelType] | [];
}

const responseObject: GetUserPostsResponse = {
  success: false,
  message: "",
  posts: [],
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      responseObject.message = "No User Email Provided";
      return res.status(401).json(responseObject);
    }

    const user = (await UserModel.findOne({
      email: userEmail,
    })) as UserModelType | null;

    if (!user) {
      responseObject.message = "User doesn't Exist";
      return res.status(401).json(responseObject);
    }

    let posts = await PostModel.find({ userEmail });

    posts = posts.sort((a: PostModelType, b: PostModelType) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    responseObject.success = true;
    responseObject.message = "Got posts successfully";
    responseObject.posts = posts;

    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    responseObject.posts = []
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
