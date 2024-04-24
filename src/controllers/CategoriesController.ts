import { Prisma, PrismaClient } from '@prisma/client';
import { Body, Delete, Get, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';
import type { CategoryCollectionReponse, CategoryCreationResponse, CategoryDeletionResponse, CategoryResponse, CheckCategoryAvailabilityResponse } from '../types';
import type { NewCategory } from '../models/Category';

@Route("/categories")
@Tags("Categories")
export class CategoriesController {
  prisma = new PrismaClient();

  @Get("/")
  @SuccessResponse("200", "Sucess")
  public async getCategories(): Promise<CategoryCollectionReponse> {
    try {
      const categories = await this.prisma.category.findMany();
      const categoryCount = await this.prisma.category.count();

      return {
        categories,
        categoryCount
      }
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          categories: null,
          categoryCount: 0,
          error: {
            code: error.code,
            message: error.message,
            meta: error.meta
          }
        }
      }
      else {
        return {
          categoryCount: 0,
          categories: null,
          error: {
            code: "500",
            message: "Something went wrong getting users",
            meta: null
          }
        }
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
  }

  @Get("/:id")
  public async getCategory(id: number): Promise<CategoryResponse> {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id
        }
      });

      if (category === null) {
        return {
          category: null,
          error: {
            message: `Couldn't find user with id ${id}`
          }
        }
      }
      
      return {
        category
      }
    }
    catch (error) {
      return {
        category: null,
        error: {
          message: `Error trying to get category with id ${id}}`
        }
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
  }

  @Post("/")
  public async createCategory(@Body() category: NewCategory): Promise<CategoryCreationResponse> {
    try {
      const createdCategory = await this.prisma.category.create({
        data: category
      });

      if (createdCategory === null) {
        return {
          message: null,
          category: null,
          error: {
            message: "Could not create new category",
            code: "500",
            meta: null
          }
        }
      }

      return {
        message: "¡Category created sucessfully!",
        category: createdCategory
      }
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          message: null,
          category: null,
          error: {
            code: error.code,
            message: error.message,
            meta: error.meta
          }
        };
      } else {
        return {
          message: `Error creating new category -> Internal server error}`,
          category: null,
        };
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
  }

  @Delete("/:id")
  public async deleteCategory(id: number): Promise<CategoryDeletionResponse> {
    try {
      const deletedCategory = await this.prisma.category.delete({
        where: {
          id
        }
      });

      if (deletedCategory === null) {
        return {
          category: null,
          message: null,
          error: {
            code: "500",
            message: "",
            meta: null
          }
        }
      }

      return {
        message: ``,
        category: deletedCategory
      }
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          message: null,
          category: null,
          error: {
            code: error.code,
            message: error.message,
            meta: error.meta
          }
        };
      } else {
        return {
          message: `Error deleting user with id ${id} Internal server error}`,
          category: null,
        };
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
  }

  public async CheckIfCategoryExists(Name: string): Promise<CheckCategoryAvailabilityResponse> {
    try {
      const category = await this.prisma.category.findMany({
        where: {
          Name: Name
        }
      })

      return {
        isAvailable: category.length === 0
      }
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          isAvailable: null,
          error: {
            code: error.code,
            message: error.message,
            meta: error.meta
          }
        };
      } else {
        return {
          isAvailable: null,
          error: {
            code: "500",
            message: "Something went wrong checking for username availability",
            meta: null,
          }
        };
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
  }
}

