export interface User {
  id: number;
  name: string;
  username: string;
  lastname: string;
  email: string;
  password: string;
  role: number
}

/**
 *  A post request shouldn't contain an id.
 */
export type UserCreationParams = Pick<User, "name" | "username" | "lastname" | "email" | "role" | "password">;

/**
 *  A get request don't have to inlcude password field
 */
export type UserGetParams = Pick<User, "id" | "username" | "lastname" | "email" | "role">;