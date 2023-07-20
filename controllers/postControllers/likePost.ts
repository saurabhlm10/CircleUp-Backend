import { Request, Response } from "express";

import PostModel from "../../models/PostModel";
import { MongooseError } from "mongoose";

interface LikePostResponse {
  success: boolean;
  message: string;
  post: PostModelType | {};
}

const responseObject: LikePostResponse = {
  success: false,
  message: "",
  post: {},
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const { userEmail, postId } = req.params;

    if (!(userEmail && postId)) {
      responseObject.message = "username and postId are required";
      return res.status(401).json(responseObject);
    }

    const { likes } = (await PostModel.findById({
      _id: postId,
    })) as PostModelType;

    if (likes.includes(userEmail)) {
      responseObject.post = (await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $pull: { likes: userEmail },
        },
        {
          new: true,
        }
      )) as PostModelType;

      responseObject.message = "removed like successfully";
    } else {
      responseObject.post = (await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: { likes: userEmail },
        },
        {
          new: true,
        }
      )) as PostModelType;

      responseObject.message = "added like successfully";
    }

    responseObject.success = true;

    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    responseObject.post = {}
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
