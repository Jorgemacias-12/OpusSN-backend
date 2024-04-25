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
          User: { connect: { id: post.User } },
          Categories: {
            connect: post.Categories.map((categoryId: number) => ({ id: categoryId }))
          }
        }
      });

      return {
        message: "¡Post creado exitosamente!",
        post: {
          id: newPost.id,
          Title: newPost.Title,
          Content: newPost.Content,
          Categories: post.Categories.map((categoryId: number) => categoryId),
          CreationDate: newPost.CreationDate,
          User: newPost.userId
        }
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