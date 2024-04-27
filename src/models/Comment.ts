import type { BasePost } from "./Post";
import type { User } from "./User";

export interface CommentBase {
  id: number;
  Content: string;
  CreatedAt: Date;
  Post: BasePost
  postId: number;
  User: User;
  userId: number;
}

export interface ResponseComment {
  id: number;
  Content: string;
  CreatedAt: Date;
  postId: number;
  userId: number;
}

export interface NewComment extends Pick<CommentBase, 'Content' | 'postId' | 'userId'> { }