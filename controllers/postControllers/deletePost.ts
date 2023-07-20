import { Request, Response } from "express";
import PostModel from "../../models/PostModel";
import { MongooseError } from "mongoose";

interface DeletePostResponse {
  success: boolean;
  message: string;
}

const responseObject: DeletePostResponse = {
  success: false,
  message: "",
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      responseObject;
      return res.status(401).json(responseObject);
    }

    const response = (await PostModel.findOneAndDelete({
      _id: postId,
    })) as PostModelType | null;

    responseObject.success = true;
    responseObject.message = "Post Deleted Successfully";

    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
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
