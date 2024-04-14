/**
 *  This User representation is supposted to be used in the creation method
 *  in the UsersController.
 * 
 */
export interface User {
  /**
   *  It's an incremental value, and normal integer
   */
  id: number;

  /**
   *  User's real name
   */
  name: string;

  /**
   * The name that will be displayed in the UI
   */
  username: string;

  /**
   * User's lastname
   */
  lastname: string;

  /**
   * The email the user usted to register his account
   */
  email: string;

  /**
   * The password that the user creates to authenticate with the 
   * social media.
   */
  password: string;

  /**
   * His role in the Platform could be normal user or mod
   * @isInt 
   * @example 
   * 0 is normal
   * @example 
   * 1 is mod
   */
  role: number
}

/**
 *  This User representation is supposted to be used in the creation method
 *  in the UsersController.
 * 
 */
export interface UserCreationParams extends Pick<User, "name" | "username" | "lastname" | "email" | "role" | "password"> { };

/**
 *  This User representation is supposted to be used in the creation method
 *  in the UsersController.
 * 
 */
export interface UserGetParams extends Pick<User, "id" | "username" | "lastname" | "email" | "role"> { };