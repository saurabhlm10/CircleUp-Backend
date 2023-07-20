import { Request, Response } from "express";

import PostModel from "../../models/PostModel";
import { MongooseError } from "mongoose";

interface DeleteCommentResponse {
  success: boolean;
  message: string;
  post: PostModelType | {};
}

const responseObject: DeleteCommentResponse = {
  success: false,
  message: "",
  post: {},
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId, postId } = req.params;

    if (!(commentId && postId)) {
      responseObject.message = "commentId & postId is required";
      res.status(401).json(responseObject);
    }

    const updatedPost = await PostModel.findByIdAndUpdate(postId, {
      $pull: {
        comments: { _id: commentId },
      },
    }, {
      new: true
    });

    responseObject.success = true;
    responseObject.message = "Comment Deleted Successfully";
    responseObject.post = updatedPost;

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
