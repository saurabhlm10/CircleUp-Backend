import { Request, Response } from "express";
import UserModel from "../../models/UserModel";

interface CheckUsername {
  Googlename: string;
}

const usernameExistsChecker = async (username: string): Promise<boolean> => {
  try {
    const usernameExists = await UserModel.findOne({ username });
    return usernameExists ? true : false;
  } catch (error) {
    console.log(error);
    return true;
  }
};

const usernameConstructor = async (username: string): Promise<string> => {
  let usernameExists: boolean = true;

  let constructedUsername: string = "";

  while (usernameExists) {
    constructedUsername =
      username.replace(" ", "") +
      String(Math.random() * 100000)
        .slice(0, 6)
        .replace(".", "");
    usernameExists = (await usernameExistsChecker(username)) ? true : false;
  }

  return constructedUsername;
};

export const checkUsernameController = async (req: Request, res: Response) => {
  try {
    const { Googlename }: CheckUsername = req.body;

    const responseObject: CheckUsernameResponseModel = {
      success: false,
      message: "",
      username: "",
    };

    if (!Googlename) {
      responseObject.message = "Google name is missing";
     return res.status(401).json(responseObject);
    }
    let username: string;
    username = await usernameConstructor(Googlename);

    console.log(username);

    responseObject.success = true;
    responseObject.message = "Username Created Successfully";
    responseObject.username = username;

    return res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};
