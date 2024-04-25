import type { PostCategory } from "./Category";

export interface Post {
  id: number;
  Title: string;
  Content: string;
  CreationDate: Date;
  UpdateDate?: Date | null;
  Categories: number[]
  User: number
}

export interface NewPost extends Pick<Post, "Title" | "Content" | "CreationDate" | "UpdateDate" | "User" | "Categories"> {};