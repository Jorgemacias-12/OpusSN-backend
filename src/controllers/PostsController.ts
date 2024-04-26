import { PrismaClient } from "@prisma/client";
import { Body, Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import type { PostCreationReponse, PostDeleteResponse, PostResponse, PostUpdateResponse, PostsReponse } from "../types";
import type { BasePost, NewPost, UpdatePost } from "../models/Post";
import { toIsoDate } from "../utils";

@Route("/posts")
@Tags("Posts")
export class PostsController {
  prisma = new PrismaClient();

  @Get("/")
  public async getPosts(): Promise<PostsReponse> {
    try {
      const posts = await this.prisma.post.findMany({
        include: { Categories: true }
      });
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
        },
        include: {
          Categories: true
        }
      })
      return {
        post
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
        where: {
          id: post.User
        }
      })

      if (!user) {
        throw new Error(`Couldn't find user with id ${post.User}`);
      }

      const existingCategories = await this.prisma.category.findMany({
        where: { id: { in: post.Categories } }
      });

      if (existingCategories.length !== post.Categories.length) {
        throw new Error("One or more categories that are specified are non existent.");
      }

      const newPost = await this.prisma.post.create({
        data: {
          Title: post.Title,
          Content: post.Content,
          CreationDate: toIsoDate(post.CreationDate),
          User: { connect: { id: post.User } },
          Categories: { connect: existingCategories.map((category) => ({ id: category.id })) },
        },
        include: {
          Categories: true
        }
      })

      return {
        createdPost: newPost
      }
    }
    catch (err) {
      console.error(err)
      return {
        error: {
          message: `Post creation failed info: ${err}`
        },
        createdPost: null
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
  }

  @Put("/:id")
  public async updatePost(@Body() post: UpdatePost): Promise<PostUpdateResponse> {
    try {
      const updateData: any = {
        Title: post.Title,
        Content: post.Content,
        UpdateDate: post.UpdateDate
      };

      if (post.Categories) {
        updateData.categories = {
          connect: post.Categories.map((cat) => ({ id: cat.id }))
        };
      }

      const updatedPost = await this.prisma.post.update({
        where: { id: post.id },
        data: updateData,
        include: {
          Categories: true
        }
      })

      return {
        message: "Updating post operation went successfully",
        updatedPost
      }
    }
    catch (error) {
      throw error;
    }
    finally {
      await this.prisma.$disconnect();
    }
  }

  @Delete("/:id")
  public async deletePost(@Query() id: number): Promise<PostDeleteResponse> {
    try {
      const existingPost = await this.prisma.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new Error(`Post with ID ${id} not found`);
      }

      const deletedPost = await this.prisma.post.delete({
        where: { id },
        include: {
          Categories: true
        }
      });

      return {
        message: `Post with ID: ${id} has been deleted successfully`,
        deletedPost: deletedPost
      }
    }
    catch (error) {
      return { error: { message: `Error deleting post: ${error}` } };
    }
    finally {
      await this.prisma.$disconnect();
    }
  }
}