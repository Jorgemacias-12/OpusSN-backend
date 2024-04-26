import { PrismaClient } from "@prisma/client";
import { Body, Get, Post, Put, Query, Route, Tags } from "tsoa";
import type { NewPost, PrismaPost, } from "../models/Post";
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
      const user = await this.prisma.user.findUnique({
        where: { id: post.User }
      });

      if (!user) {
        throw new Error(`User with id ${post.User} not found}`)
      }

      const existingCategories = await this.prisma.category.findMany({
        where: { id: { in: post.Categories } }
      })

      if (existingCategories.length !== post.Categories.length) {
        throw new Error('One or more categories specified are non existent');
      }

      const newPost = await this.prisma.post.create({
        data: {
          Title: post.Title,
          Content: post.Content,
          CreationDate: toIsoDate(post.CreationDate),
          User: { connect: { id: post.User } },
          Categories: { connect: existingCategories.map((category) => ({ id: category.id })) }
        }
      })

      return {
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

  @Put()
  public async updatePost(@Query() id: number, @Body() post: PrismaPost) {

  }

  public async deletePost() {

  }
}