import { Request, Response } from "express";
import PostModel from "../../models/PostModel";
import { MongooseError } from "mongoose";

interface GetPostResponse {
  success: boolean;
  message: string;
  post: PostModelType | {};
}

const responseObject: GetPostResponse = {
  success: false,
  message: "",
  post: {},
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      responseObject.message = "Post Id Missing";
      return res.status(401).json(responseObject);
    }

    const post = (await PostModel.findById(postId)) as PostModelType;

    console.log(post);

    responseObject.success = true;
    responseObject.message = "Got Post Successfully";
    responseObject.post = post;
    return res.status(200).json(responseObject);
  } catch (error) {
    responseObject.post = {};
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
