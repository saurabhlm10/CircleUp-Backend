interface PostModelType {
  _id: string;
  imageUrl: string;
  userId: string;
  username: string;
  likes: [string];
  comments: [CommentModel];
  createdAt: string
}

interface CommentModel {
  comment: string;
  username: string;
  created_at: string;
}
