import { Request, Response } from "express";
import UserModel from "../../models/UserModel";

/******************************************************
 * @LOGIN
 * @route /api/profile/getProfileByEmail/:profileEmail
 * @description Controller for fetching a profile
 * @parameters profileEmail
 * @returns user
 * @algo algorithm
 *  Collect info
 *  Check if all fields are provided
 *  Check if user already exists or not
 *  Send Profile
 ******************************************************/

interface GetProfileByEmailResponse
  extends Omit<UserModelResponse, "followers" | "following"> {
  followers: [string] | [];
  following: [string] | [];
}

export const getProfileByEmailController = async (
  req: Request,
  res: Response
) => {
  try {

    // Collect info
    const { profileEmail } = req.params;

    console.log(profileEmail);

    const responseObject: LoginResponseModel | GetProfileByEmailResponse = {
      success: false,
      message: "",
      user: {},
    };

    // Check if all fields are provided
    if (!profileEmail) {
      responseObject.message = "Email is required";
      return res.status(401).json(responseObject);
    }

    const user = (await UserModel.findOne({
      email: profileEmail,
    })) as UserModelType | null;

    // Check if user already exists or not
    if (!user) {
      responseObject.message = "Email is not registered";
      return res.status(401).json(responseObject);
    }
    user.password = undefined;
    responseObject.success = true;
    responseObject.message = "Profile fetched successfully";
    responseObject.user = user;

    // Send Profile
    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};
