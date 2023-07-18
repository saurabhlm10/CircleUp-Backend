import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import { MongooseError } from "mongoose";

type AddRemoveFollower = (a: string, b: string) => Promise<UserModelType>;

const removeFromFollowersList: AddRemoveFollower = async (
  userEmail,
  foreignUserEmail
) => {
  const removeFromFollowersListResponse = await UserModel.findOneAndUpdate(
    { email: foreignUserEmail },
    { $pull: { followers: userEmail } },
    {
      new: true,
    }
  );
  return removeFromFollowersListResponse as UserModelType;
};

const removeFromFollowingList: AddRemoveFollower = async (
  userEmail,
  foreignUserEmail
) => {
  const removeFromFollowingListResponse = (await UserModel.findOneAndUpdate(
    { email: userEmail },
    { $pull: { following: foreignUserEmail } },
    {
      new: true,
    }
  )) as UserModelType;

  return removeFromFollowingListResponse;
};

const addToFollowersList: AddRemoveFollower = async (
  userEmail,
  foreignUserEmail
) => {
  const addToFollowersListResponse = (await UserModel.findOneAndUpdate(
    { email: foreignUserEmail },
    { $addToSet: { followers: userEmail } },
    {
      new: true,
    }
  )) as UserModelType;
  return addToFollowersListResponse;
};

const addToFollowingList: AddRemoveFollower = async (
  userEmail,
  foreignUserEmail
) => {
  const addToFollowingListResponse = (await UserModel.findOneAndUpdate(
    { email: userEmail },
    { $addToSet: { following: foreignUserEmail } },
    {
      new: true,
    }
  )) as UserModelType;

  return addToFollowingListResponse;
};

interface AddRemoveFollowerResponse {
  success: boolean;
  message: string;
  foreignUser: UserModelResponse | {};
  user: UserModelResponse | {};
}

const responseObject: AddRemoveFollowerResponse = {
  success: false,
  message: "",
  foreignUser: {},
  user: {},
};

export const addRemoveFollower = async (req: Request, res: Response) => {
  try {
    const { userEmail, foreignUserEmail } = req.params;

    if (!(userEmail && foreignUserEmail)) {
      responseObject.message = "All fields are required";
      return res.status(401).json(responseObject);
    }

    if (userEmail === foreignUserEmail) {
      responseObject.message = "Cannot follow self";
      return res.status(401).json(responseObject);
    }

    const user = (await UserModel.findOne({
      email: userEmail,
    })) as UserModelType | null;

    if (!user) {
      responseObject.message = "user doesn't exist";
      return res.status(401).json(responseObject);
    }

    const foreignUser = (await UserModel.findOne({
      email: foreignUserEmail,
    })) as UserModelType | null;

    if (!foreignUser) {
      responseObject.message = "foreignUser doesn't exist";
      return res.status(401).json(responseObject);
    }

    if (foreignUser.followers.includes(userEmail)) {
      const removedFollower = removeFromFollowersList(
        userEmail,
        foreignUserEmail
      );

      const removedFollowing = removeFromFollowingList(
        userEmail,
        foreignUserEmail
      );

      const [removeFromFollowersListResponse, removeFromFollowingListResponse] =
        await Promise.all([removedFollower, removedFollowing]);

      responseObject.message = "Removed Follower";

      responseObject.success = true;
      responseObject.user = removeFromFollowersListResponse;
      responseObject.foreignUser = removeFromFollowingListResponse;

      return res.status(200).json(responseObject);
    }

    const addedFollower = addToFollowersList(userEmail, foreignUserEmail);

    const addedFollowing = addToFollowingList(userEmail, foreignUserEmail);

    const [addToFollowersListResponse, addToFollowingListResponse] =
      await Promise.all([addedFollower, addedFollowing]);

    responseObject.message = "Added Follower";

    responseObject.success = true;
    responseObject.user = addToFollowersListResponse;
    responseObject.foreignUser = addToFollowingListResponse;

    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    responseObject.user = {}
    responseObject.foreignUser = {}
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
