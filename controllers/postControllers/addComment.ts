import { Request, Response } from "express";

import PostModel from "../../models/PostModel";
import { MongooseError } from "mongoose";

interface AddCommentBody {
  comment: string;
}

interface CommentObject {
  comment: string;
  userEmail: string;
}

interface AddCommentResponse {
  success: boolean;
  message: string;
  post: PostModelType | {};
}

const responseObject: AddCommentResponse = {
  success: false,
  message: "",
  post: {},
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { userEmail, postId } = req.params;

    const { comment }: AddCommentBody = req.body;

    if (!(userEmail && postId && comment)) {
      responseObject.message = "userEmail, postId, comment is required";
      return res.status(401).json(responseObject);
    }

    const commentObject: CommentObject = {
      comment,
      userEmail,
    };

    const addCommentResponse = (await PostModel.findByIdAndUpdate(
      { _id: postId },
      { $push: { comments: commentObject }, $set: { created_at: new Date() } },
      { new: true }
    )) as PostModelType;

    responseObject.success = true;
    responseObject.message = "Added comment successfully";
    responseObject.post = addCommentResponse;

    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
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
