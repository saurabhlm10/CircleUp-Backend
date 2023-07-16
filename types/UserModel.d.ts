interface UserModelType {
  _id: string;
  username: string;
  email: string;
  password: string | undefined;
  followers: [string];
  following: [string];
}

interface UserModelResponse {
  _id: string;
  username: string;
  email: string;
  followers: string[];
  following: string[];
}
