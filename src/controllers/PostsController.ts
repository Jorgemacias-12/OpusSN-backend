import { PrismaClient } from "@prisma/client";
import { Body, Post, Route, Tags } from "tsoa";
import type { NewPost, } from "../models/Post";
import type { PostCreationReponse } from "../types";
import { toIsoDate } from "../utils";
import type { PostCategory } from "../models/Category";

@Route("/posts")
@Tags("Posts")
export class PostsController {
  prisma = new PrismaClient();

  public async getPosts() {

  }

  public async getPost() {

  }

  @Post("/")
  public async createPost(@Body() post: NewPost): Promise<PostCreationReponse> {
    try {
      const newPost = await this.prisma.post.create({
        data: {
          Title: post.Title,
          Content: post.Content,
          CreationDate: toIsoDate(post.CreationDate),
          user: { connect: { id: post.User } },
          categories: {
            connect: post.PostCategory.map((categoryId: number) => ({ id: categoryId }))
          }
        }
      });

      return {
        message: "¡Post created sucessfully!",
        post: newPost
      }
    }
    catch (err) {
      console.error(err)
      return {
        error: {
          message: `Post creation failed info: ${err}`
        },
        post: null
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
  }

  public async updatePost() {

  }

  public async deletePost() {

  }
}