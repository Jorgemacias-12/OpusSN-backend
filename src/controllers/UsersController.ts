import { Get, Path, Post, Route, Response, SuccessResponse, Tags, Body, Put, Delete, } from 'tsoa'

// TODO: Define response types in the types folder

@Route("/users") // The given route base path in this case users
@Tags("Users") // This tag is applied in the swagger ui
export default class UserController {

  // You can use JSDoc to add description to the operation 
  // of the endpoint.

  /**
   *  Gets a list with all of the users
   */
  @Get("/")
  public async getUsers() {

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
   *  @param user The data of the new user.
   */
  @Post("/")
  public async createUser(@Body() user: any) {

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