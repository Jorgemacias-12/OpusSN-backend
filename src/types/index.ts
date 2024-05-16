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

/**
 * Represents the response from creating a new category.
 *
 * @interface CategoryCreationResponse
 */
export interface CategoryCreationResponse {
  /**
   * A message indicating the outcome of the category creation operation.
   *
   * @type {string | null | undefined}
   */
  message?: string | null;

  /**
   * The created category data, or `null` if the category creation was unsuccessful.
   *
   * @type {Category | null}
   */
  category: Category | null;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {PrismaError | undefined}
   */
  error?: PrismaError;
}

/**
 * Represents the response from fetching a collection of categories.
 *
 * @interface CategoryCollectionResponse
 */
export interface CategoryCollectionResponse {
  /**
   * An array of categories retrieved from the collection.
   *
   * @type {Category[] | null}
   */
  categories: Category[] | null;

  /**
   * The count of categories included in the response.
   *
   * @type {number}
   */
  categoryCount: number;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {PrismaError | undefined}
   */
  error?: PrismaError;
}

/**
 * Represents the response from checking category availability.
 *
 * @interface CheckCategoryAvailabilityResponse
 */
export interface CheckCategoryAvailabilityResponse {
  /**
   * Indicates whether the category is available or not.
   *
   * @type {boolean | null}
   */
  isAvailable: boolean | null;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {PrismaError | undefined}
   */
  error?: PrismaError;
}

/**
 * Represents the response from deleting a category.
 *
 * @interface CategoryDeletionResponse
 */
export interface CategoryDeletionResponse {
  /**
   * A message indicating the outcome of the category deletion operation.
   *
   * @type {string | null | undefined}
   */
  message?: string | null;

  /**
   * The deleted category data, or `null` if the category deletion was unsuccessful.
   *
   * @type {Category | null}
   */
  category: Category | null;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {PrismaError | undefined}
   */
  error?: PrismaError;
}

/**
 * Represents the response containing a category.
 *
 * @interface CategoryResponse
 */
export interface CategoryResponse {
  /**
   * The category data, or `null` if no category was found.
   *
   * @type {Category | null}
   */
  category: Category | null;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {{ message: string } | undefined}
   */
  error?: {
    message: string;
  };
}

/**
 * Represents the response containing a single post.
 *
 * @interface PostResponse
 */
export interface PostResponse {
  /**
   * The post data, or `null` if no post was found.
   *
   * @type {BasePost | null}
   */
  post: BasePost | null;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {{ message: string } | undefined}
   */
  error?: {
    message: string;
  };
}

/**
 * Represents the response containing a collection of posts.
 *
 * @interface PostsResponse
 */
export interface PostsResponse {
  /**
   * An array of posts retrieved from the collection.
   *
   * @type {BasePost[] | null}
   */
  posts: BasePost[] | null;

  /**
   * The count of posts included in the response.
   *
   * @type {number | undefined}
   */
  postCount?: number;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {{ message: string } | undefined}
   */
  error?: {
    message: string;
  };
}

/**
 * Represents the response from creating a new post.
 *
 * @interface PostCreationResponse
 */
export interface PostCreationResponse {
  /**
   * The created post data, or `null` if the post creation was unsuccessful.
   *
   * @type {BasePost | null}
   */
  createdPost: BasePost | null;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {{ message: string } | undefined}
   */
  error?: {
    message: string;
  };
}

/**
 * Represents the response from updating a post.
 *
 * @interface PostUpdateResponse
 */
export interface PostUpdateResponse {
  /**
   * The updated post data, or `null` if the post update was unsuccessful.
   *
   * @type {BasePost | null}
   */
  updatedPost: BasePost | null;

  /**
   * A message indicating the outcome of the post update operation.
   *
   * @type {string}
   */
  message: string;
}

/**
 * Represents the response from deleting a post.
 *
 * @interface PostDeleteResponse
 */
export interface PostDeleteResponse {
  /**
   * The deleted post data, or `null` if the post deletion was unsuccessful.
   *
   * @type {BasePost | null | undefined}
   */
  deletedPost?: BasePost | null;

  /**
   * A message indicating the outcome of the post deletion operation.
   *
   * @type {string | undefined}
   */
  message?: string;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {{ message: string } | undefined}
   */
  error?: {
    message: string;
  };
}

/**
 * Represents the response from creating a new comment.
 *
 * @interface CommentCreationResponse
 */
export interface CommentCreationResponse {
  /**
   * The created comment data.
   *
   * @type {ResponseComment}
   */
  comment: ResponseComment;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {{ message: string } | undefined}
   */
  error?: {
    message: string;
  };

  /**
   * A message indicating the outcome of the comment creation operation.
   *
   * @type {string | undefined}
   */
  message?: string;
}

/**
 * Represents the response from user authentication.
 *
 * @interface UserAuthenticationResponse
 */
export interface UserAuthenticationResponse {
  /**
   * The authenticated user data, or `null` if authentication failed.
   *
   * @type {SafeUser | null}
   */
  user: SafeUser | null;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {{ message: string } | undefined}
   */
  error?: {
    message: string;
  };

  /**
   * A message indicating the outcome of the user authentication operation.
   *
   * @type {string | undefined}
   */
  message?: string;
}

/**
 * Represents the response from fetching comments.
 *
 * @interface CommentsFetchResponse
 */
export interface CommentsFetchResponse {
  /**
   * An array of comments retrieved from the fetch operation.
   *
   * @type {ResponseComment[] | null}
   */
  comments: ResponseComment[] | null;

  /**
   * Optional error object containing information about any error that occurred during the request.
   *
   * @type {{ message: string } | undefined}
   */
  error?: {
    message: string;
  };

  /**
   * A message indicating the outcome of the comments fetch operation.
   *
   * @type {string | undefined}
   */
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

export enum PORTS {
  SECURE_WEB_TRAFFIC = 8443,
}