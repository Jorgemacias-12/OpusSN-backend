import { Get, Path, Post, Route, Response, SuccessResponse, Tags, Body, Put, Delete, } from 'tsoa'
import type { User, UserCreationParams, UserGetParams } from '../models/User';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils';
import type { GetUsersResponse } from '../types';

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
  public async getUsers(): Promise<GetUsersResponse | undefined> {
    try {
      const users = await this.prisma.user.findMany();
      const userCount = await this.prisma.user.count();

      const transformedUsers: UserGetParams[] = users.map(user => ({
        id: user.id,
        name: user.Name, // Transforma Name a name
        lastname: user.LastName, // Transforma LastName a lastname
        username: user.UserName, // Transforma UserName a username
        email: user.Email, // Transforma Email a email
        role: user.Role, // Transforma Role a role
      }));
      
      return {
        count: userCount,
        users: transformedUsers
      }
    }
    catch (err) {
      console.error(err);
      return undefined;
    }
    finally {
      this.prisma.$disconnect();
    }
  }

  /**
   *  Get an specified user by ID
   * @param id ID of the user.
   */
  @Get("/{id}")
  public async getUser(
    @Path() id: string
  ) {

  }

  /**
   *  Creates a new user.
   *  @param {User} user The data of the new user.
   *  
   */
  @Post("/")
  public async createUser(@Body() user: UserCreationParams) {
    const { name, lastname, username, email, password, role } = user;

    const newUser = await this.prisma.user.create({
      data: {
        Name: name,
        LastName: lastname,
        UserName: username,
        Email: email,
        Password: await hashPassword(password),
        Role: role
      }
    })

    await this.prisma.$disconnect();

    return newUser;
  }

  /**
   * Updates an existent user
   * @param id The id of the user to be updated
   * @param user The new data of the user
   */
  @Put("/{id}")
  public async updateUser(
    @Path() id: string,
    @Body() user: any
  ) {

  }

  /**
   *  Deletes an existent user.
   *  @param id The ID related to the user.
   */
  @Delete("/{id}")
  public async deleteUser(@Path() id: string) {

  }
}