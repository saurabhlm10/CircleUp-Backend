import { Request, Response } from "express";

import PostModel from "../../models/PostModel";
import { MongooseError } from "mongoose";

interface GetPostsResponse {
  success: boolean;
  message: string;
  posts: [PostModelType] | [];
}

const responseObject: GetPostsResponse = {
  success: false,
  message: "",
  posts: [],
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { followersArray } = req.params;

    if (!followersArray) {
      responseObject.message = "No Follower Array Provided";
      return res.status(401).json(responseObject);
    }
    const newFollowersArray = followersArray.split(",");

    let posts = (await PostModel.find({
      userEmail: { $in: newFollowersArray },
    })) as [PostModelType];

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
    responseObject.posts = [];
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
