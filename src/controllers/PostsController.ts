import { PrismaClient } from "@prisma/client";
import { Body, Get, Post, Put, Query, Route, Tags } from "tsoa";
import type { NewPost, PrismaPost, UpdatePost, } from "../models/Post";
import type { PostCreationReponse, PostResponse, PostsResponse } from "../types";
import { toIsoDate } from "../utils";
import type { PostCategory } from "../models/Category";

@Route("/posts")
@Tags("Posts")
export class PostsController {
  prisma = new PrismaClient();

  @Get("/")
  public async getPosts(): Promise<PostsResponse> {
    try {
      const posts = await this.prisma.post.findMany();
      const postCount = await this.prisma.post.count();

      return {
        posts,
        postCount
      }
    }
    catch (error) {
      return {
        posts: null,
        error: {
          message: `Error ${error}`
        }
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
  }

  @Get("/:id")
  public async getPost(@Query() id: number): Promise<PostResponse> {
    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id
        }
      });

      return {
        post,
      }
    }
    catch (error) {
      return {
        post: null,
        error: {
          message: `Error: ${error}`
        }
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
  }

  @Post("/")
  public async createPost(@Body() post: NewPost): Promise<PostCreationReponse> {
    try {
      
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

  @Put()
  public async updatePost(@Body() post: UpdatePost) {

  }

  public async deletePost() {

  }
}