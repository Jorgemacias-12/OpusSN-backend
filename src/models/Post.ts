import type { PostCategory } from "./Category";

export interface Post {
  id: number;
  Title: string;
  Content: string;
  CreationDate: Date;
  UpdateDate?: Date | null;
  Categories: number[]
  User: number
  userId?: number
}

export interface PrismaPost {
  id: number;
  Title: string;
  Content: string;
  CreationDate: Date | null;
  // Categories: number[]
  UpdateDate?: Date | null;
  userId: number;
}

export interface NewPost extends Pick<Post, "Title" | "Content" | "CreationDate" | "UpdateDate" | "User" | "Categories"> {};