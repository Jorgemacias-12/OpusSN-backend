import { Get, Path, Post, Route, Response, SuccessResponse, Tags, Body, Put, Delete, } from 'tsoa'
import type { LoginUser, NewUser, SafeUser, User } from '../models/User';
import { Prisma, PrismaClient } from '@prisma/client'
import { hashPassword, verifyPassword } from '../utils';
import type { CheckUsernameAvailabilityResponse, UserAuthenticationResponse, UserCollectionResponse, UserCreationResponse, UserDeletedResponse, UserResponse, UserUpdatedResponse } from '../types';

// TODO: Define response types in the types folder

@Route("/users") // The given route base path in this case users
@Tags("Users") // This tag is applied in the swagger ui
export default class UserController {

  // prisma client object
  prisma = new PrismaClient();

  // You can use JSDoc to add description to the operation 
  // of the endpoint.

  /**
 * Retrieves a list of all users and the total user count.
 *
 * @returns {Promise<UserCollectionResponse>} - A promise that resolves to a {@link UserCollectionResponse} object containing an array of users and the user count, or null in case of  an error.
 * 
 */
  @Get("/")
  // TODO: improve error handling
  public async getUsers(): Promise<UserCollectionResponse> {
    try {
      const users = await this.prisma.user.findMany();
      const userCount = await this.prisma.user.count();

      return {
        users,
        userCount
      }
    }
    catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          userCount: 0,
          users: null,
          error: {
            code: err.code,
            message: err.message,
            meta: err.meta
          }
        }
      }
      else {
        return {
          userCount: 0,
          users: null,
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

  @Post("/auth")
  public async authenticate(@Body() userCreedentials: LoginUser): Promise<UserAuthenticationResponse> {
    // First get user using his email
    try {
      const user = await this.prisma.user.findUnique(({
        where: { Email: userCreedentials.Email }
      }));

      if (!user) throw user;

      // Check if the password is same
      const result = await verifyPassword(userCreedentials.Password, user.Password);

      if (!result) {
        return {
          user: null,
          error: {
            message: "Error al iniciar sesión, contraseña o email incorrectos"
          }
        }
      }

      return {
        user: {
          id: user.id,
          Name: user.Name,
          LastName: user.LastName,
          UserName: user.UserName,
          Email: user.Email,
          Role: user.Role,
        },
        message: "¡Inicio de sesión éxitoso!"
      }
    }
    catch (err) {
      return {
        user: null,
        error: {
          message: `Internal Server Error: ${err}`
        }
      }
    } 
    finally {
      await this.prisma.$disconnect();
    }
  }
  /**
   * Retrieves a specified user by their ID 
   * @param {number} id  - The ID of the user to retrieve.
   * @returns {Promise<UserReponse>} - A promise that resolves to a {@link UserResponse} object containing the user data if found, or an error message otherwise.
   * TODO: do not include password field
   */
  @Get("/{id}")
  public async getUser(
    @Path() id: number
  ): Promise<UserResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      });

      if (user === null) {
        return {
          user: null,
          error: {
            message: `Couldn't find user with id ${id}`
          }
        }
      }

      return {
        user
      }
    }
    catch (err) {
      return {
        user: null,
        error: {
          message: `Error trying to get user with id ${id}}`
        }
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
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
   * Updates an existing user by their ID.
   *
   * @param {number} id - The ID of the user to be updated.
   * @param {UserUpdatedResponse} user - The new data for the user.
   * @returns {Promise<UserUpdatedResponse>} - A promise that resolves to a {@link UserUpdatedResponse} object containing the updated user and any potential error information.
   */
  @Put("/{id}")
  public async updateUser(
    @Path() id: number,
    @Body() user: User
  ): Promise<UserUpdatedResponse> {
    try {
      // Attempt to update the user with the new data
      const updatedUser = await this.prisma.user.update({
        where: {
          id
        },
        data: user
      });

      // const 

      // Return the updated user and a success message
      return {
        message: 'User updated successfully',
        user: updatedUser,
      };
    } catch (error) {
      // Handle any errors that occurred during the update operation
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          message: null,
          user: null,
          error: {
            code: error.code,
            message: error.message,
            meta: error.meta
          }
        };
      } else {
        return {
          message: `Error deleting user with id ${id} Internal server error}`,
          user: null,
        };
      }
    } finally {
      // Ensure that the Prisma client is disconnected
      await this.prisma.$disconnect();
    }
  }


  /**
   *  Deletes an existent user.
   *  @param id The ID related to the user.
   */
  @Delete("/{id}")
  public async deleteUser(@Path() id: number): Promise<UserDeletedResponse> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id
        }
      })

      if (deletedUser === null) {
        return {
          message: null,
          user: null,
          error: {
            code: "500",
            message: "",
            meta: null
          }
        }
      }

      return {
        message: `user deletion with id ${id} went sucessfully`,
        user: deletedUser,
      }
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          message: null,
          user: null,
          error: {
            code: error.code,
            message: error.message,
            meta: error.meta
          }
        };
      } else {
        return {
          message: `Error deleting user with id ${id} Internal server error}`,
          user: null,
        };
      }
    }
    finally {
      await this.prisma.$disconnect();
    }
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