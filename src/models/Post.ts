import type { Category } from "./Category";

export interface BasePost {
  id: number;
  Title: string;
  Content: string;
  CreationDate: Date;
  UpdateDate?: Date | null;
  Categories: Category[];
  userId: number;
}

export interface NewPost {
  Title: string;
  Content: string;
  CreationDate: Date;
  UpdateDate?: Date;
  Categories: number[];
  User: number;
}

export interface UpdatePost {
  id: number;
  Title: string;
  Content: string;
  UpdateDate: Date;
  Categories: Category[];
  userId: number;
}