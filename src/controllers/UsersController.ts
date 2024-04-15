import { Get, Path, Post, Route, Response, SuccessResponse, Tags, Body, Put, Delete, } from 'tsoa'
import type { NewUser, SafeUser } from '../models/User';
import { Prisma, PrismaClient } from '@prisma/client'
import { hashPassword } from '../utils';
import type { CheckUsernameAvailabilityResponse, UserCreationResponse } from '../types';

// TODO: Define response types in the types folder

@Route("/users") // The given route base path in this case users
@Tags("Users") // This tag is applied in the swagger ui
export default class UserController {

  // prisma client object
  prisma = new PrismaClient();

  // You can use JSDoc to add description to the operation 
  // of the endpoint.

  /**
   *  Gets a list with all of the users
   */
  @Get("/")
  public async getUsers() {
    // try {
    //   const users = await this.prisma.user.findMany();
    //   const userCount = await this.prisma.user.count();

    //   const transformedUsers: UserGetParams[] = users.map(user => ({
    //     id: user.id,
    //     name: user.Name, // Transforma Name a name
    //     lastname: user.LastName, // Transforma LastName a lastname
    //     username: user.UserName, // Transforma UserName a username
    //     email: user.Email, // Transforma Email a email
    //     role: user.Role, // Transforma Role a role
    //   }));

    //   return {
    //     count: userCount,
    //     users: transformedUsers
    //   }
    // }
    // catch (err) {
    //   console.error(err);
    //   return undefined;
    // }
    // finally {
    //   this.prisma.$disconnect();
    // }
  }

  /**
   *  Get an specified user by ID
   * @param id ID of the user.
   */
  @Get("/{id}")
  public async getUser(
    @Path() id: string
  ) {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     id: Number.parseInt(id)
    //   }
    // })

    // if (user === null) return null;

    // return {
    //   id: user.id,
    //   name: user.Name,
    //   lastname: user.LastName,
    //   username: user.UserName,
    //   email: user.Email,
    //   role: user.Role
    // }
  }

  /**
   *  Creates a new user.
   *  @param {User} user The data of the new user.
   *  
   */
  @Post("/")
  public async createUser(@Body() user: NewUser): Promise<UserCreationResponse | null> {

    try {
      // Call to hashPassword to encrypt password
      // with 12 rounds of salt.
      const newUser = await this.prisma.user.create({
        data: {
          Name: user.Name,
          LastName: user.LastName,
          UserName: user.UserName,
          Email: user.Email,
          Password: await hashPassword(user.Password),
          Role: user.Role
        }
      });

      const safeUser: SafeUser = {
        id: newUser.id,
        Name: newUser.Name,
        LastName: newUser.LastName,
        UserName: newUser.UserName,
        Email: newUser.Email,
        Role: newUser.Role
      }

      const response: UserCreationResponse = {
        message: "User creation went successfully",
        newUser: safeUser
      }

      return response;
    }
    catch (err) {
      console.error(err);
      return null;
    }
    finally {
      await this.prisma.$disconnect();
    }

    // const { name, lastname, username, email, password, role } = user;

    // const newUser = await this.prisma.user.create({
    //   data: {
    //     Name: name,
    //     LastName: lastname,
    //     UserName: username,
    //     Email: email,
    //     Password: await hashPassword(password),
    //     Role: role
    //   }
    // })

    // await this.prisma.$disconnect();

    // return newUser;
  }

  /**
   * Updates an existent user
   * @param id The id of the user to be updated
   * @param user The new data of the user
   */
  @Put("/{id}")
  public async updateUser(
    @Path() id: string,
    @Body() user: {}
  ) {
    // try {
    //   const userId = Number.parseInt(id);

    //   const updatedUser = await this.prisma.user.update({
    //     where: {
    //       id: userId
    //     },
    //     data: user,
    //   });

    //   return null;
    //   // const response: UpdateUserResponse = {
    //   //   message: "",
    //   //   data: {}, 
    //   // };
    //   // return response;
    // }
    // catch (err) {

    // }
  }

  /**
   *  Deletes an existent user.
   *  @param id The ID related to the user.
   */
  @Delete("/{id}")
  public async deleteUser(@Path() id: string) {
    // try {
    //   const deletedUser = await this.prisma.user.delete({
    //     where: {
    //       id: Number.parseInt(id)
    //     }
    //   })

    //   const userInfo: UserGetParams = {
    //     id: deletedUser.id,
    //     name: deletedUser.Name,
    //     lastname: deletedUser.LastName,
    //     username: deletedUser.UserName,
    //     email: deletedUser.Email,
    //     role: deletedUser.Role
    //   }

    //   return userInfo;
    // }
    // catch (err) {
    //   console.error(err);
    //   return null;
    // }
    // finally {
    //   await this.prisma.$disconnect();
    // }
  }

  /**
   * Checks if the given username is available (not already taken).
   * @param {string} UserName - The username to check for availability.
   * @returns {Promise<CheckUsernameAvailabilityResponse>} - A promise that resolves to a response object of type {@link CheckUsernameAvailabilityResponse } containing a boolean indicating the availability of the username and an optional error object if an error occurred.
   * @typedef {CheckUsernameAvailabilityResponse} CheckUsernameAvailabilityResponse - The response type containing the availability status and an optional error object.
   */
  public async CheckIfUsernameIsAvailable(UserName: string): Promise<CheckUsernameAvailabilityResponse> {
    const response: CheckUsernameAvailabilityResponse = {
      isAvailable: false,
    };

    try {
      // Fetch only id
      const user = await this.prisma.user.findUnique({
        where: {
          UserName
        },
        select: {
          id: true
        }
      });

      response.isAvailable = user === null;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        response.error = {
          code: error.code,
          message: error.message,
          meta: error.meta
        };
      } else {
        response.error = {
          code: "500",
          message: "Something went wrong checking for username availability",
          meta: null,
        };
      }
    } finally {
      await this.prisma.$disconnect();
    }

    return response;
  }
}