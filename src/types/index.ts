import type { Category, PostCategory } from "../models/Category";
import type { CommentBase, ResponseComment } from "../models/Comment";
import type { BasePost, NewPost } from "../models/Post";
import type { SafeUser, User, UserID } from "../models/User";

/**
 * Response interface for user creation.
 * @typedef {Object} UserCreationResponse
 * @property {string} message - A message indicating the outcome of the creation process.
 * @property {SafeUser} newUser - The newly created user represented by a {@link SafeUser} object.
 */
export interface UserCreationResponse {
  message: string;
  newUser: SafeUser
}

/**
 * Response interface for checking username availability.
 * @typedef {Object} CheckUsernameAvailabilityResponse
 * @property {boolean} isAvailable - Indicates whether the username is available or not.
 * @property {PrismaError} [error] - An optional {@link PrismaError} object providing error details, if applicable.
 */
export interface CheckUsernameAvailabilityResponse {
  isAvailable: boolean;
  error?: PrismaError
}


/**
 * Response interface for user collection.
 * @typedef {Object} UserCollectionResponse
 * @property {number} userCount - The total number of users.
 * @property {User[]} [users] - An array of users, represented by {@link User} objects, or null if an error occurred.
 * @property {PrismaError} [error] - An optional {@link PrismaError} object providing error details, if applicable.
 */
export interface UserCollectionResponse {
  userCount: number;
  users: User[] | null;
  error?: PrismaError
}

/**
 * Represents the response from a request to retrieve a user by their ID.
 * 
 * @interface UserResponse
 */
export interface UserResponse {
  /**
   * The user data, or `null` if no user was found.
   * 
   * @type {SafeUser | null}
   */
  user: SafeUser | null,
  /**
   * Optional error object containing information about any error that occurred during the request.
   * 
   * @property {Object} [error]
   * @property {string} error.message - A message describing the error that occurred.
   */
  error?: {
    message: string;
  }
}

/**
 * Represents the response from a request to delete a user.
 *
 * @interface UserDeletedResponse
 */
export interface UserDeletedResponse {
  /**
   * A message indicating the outcome of the delete operation.
   *
   * @type {string | null}
   */
  message: string | null;

  /**
   * The deleted user data as a SafeUser, or `null` if the deletion was unsuccessful.
   *
   * @type {SafeUser | null}
   */
  user: SafeUser | null;

  /** @swagger
   * Optional error object containing information about any error that occurred during the request.
   *
   * @property {PrismaError} [error] - An object representing the error, if any occurred.
   */
  error?: PrismaError;
}


/**
 * Represents the response from a request to update a user.
 *
 * @interface UserUpdatedResponse
 */
export interface UserUpdatedResponse {
  /**
   * A message indicating the outcome of the update operation.
   *
   * @type {string | null}
   */
  message: string | null;

  /**
   * The updated user data, or `null` if the update was unsuccessful.
   *
   * @type {User | null}
   */
  user: User | null;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @property {PrismaError} [error] - An object representing the error, if any occurred.
   */
  error?: PrismaError;
}

/**
 * Interface representing an error from Prisma.
 * @typedef {Object} PrismaError
 * @property {string} code - The error code.
 * @property {string|unknown} meta - Additional metadata about the error.
 * @property {string} message - A description of the error.
 */
export interface PrismaError {
  code: string;
  meta: string | unknown;
  message: string;
}


export interface CategoryCreationResponse {
  message?: string | null;
  category: Category | null
  error?: PrismaError
}

export interface CategoryCollectionReponse {
  categories: Category[] | null;
  categoryCount: number;
  error?: PrismaError;
}

export interface CheckCategoryAvailabilityResponse {
  isAvailable: boolean | null;
  error?: PrismaError;
}

export interface CategoryDeletionResponse {
  message?: string | null;
  category: Category | null;
  error?: PrismaError
}

export interface CategoryResponse {
  category: Category | null;
  error?: {
    message: string;
  }
}


export interface PostResponse {
  post: BasePost | null,
  error?: {
    message: string;
  }
}

export interface PostsReponse {
  posts: BasePost[] | null;
  postCount?: number;
  error?: {
    message: string;
  }
}

export interface PostCreationReponse {
  createdPost: BasePost | null,
  error?: {
    message: string;
  }
}

export interface PostUpdateResponse {
  updatedPost: BasePost | null,
  message: string;
}

export interface PostDeleteResponse {
  deletedPost?: BasePost | null;
  message?: string;
  error?: {
    message: string;
  }
}

export interface CommentCreationResponse {
  comment: ResponseComment; 
  error?: {
    message: string;
  }
  message?: string 
}

export interface UserAuthenticationResponse {
  user: SafeUser | null;
  error?: {
    message: string;
  }
  message?: string;
} 

/**
 * Enumeration of possible response codes.
 * @enum {number}
 */
export enum RESPONSE_CODES {
  /** Successful request */
  OK = 200,

  /** Resource successfully created */
  CREATED = 201,

  /** Bad request */
  BAD_REQUEST = 400,

  /** Resource not found */
  NOT_FOUND = 404,

  /** Internal server error */
  INTERNAL_SERVER_ERROR = 500,
}