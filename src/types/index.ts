import type { SafeUser, User } from "../models/User";

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