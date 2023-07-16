import { Request, Response } from "express";
import UserModel from "../../models/UserModel";

interface ChangeUsername {
  username: string;
  newUsername: string;
}

interface ChangeUsernameResponse {
  success: boolean;
  message: string;
  newUsername: string;
}

export const changeUsernameController = async (req: Request, res: Response) => {
  try {
    const { username, newUsername }: ChangeUsername = req.body;

    const responseObject: ChangeUsernameResponse = {
      success: false,
      message: "",
      newUsername: "",
    };

    if (!username) {
      responseObject.message = "Username is missing";
      res.status(401).json(responseObject);
    }

    const response = await UserModel.findOneAndUpdate(
      { username },
      { username: newUsername }
    );

    console.log(response);

    res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
