import type { SafeUser, User } from "../models/User";

export interface UserCreationResponse {
  message: string;
  newUser: SafeUser
}

export interface CheckUsernameAvailabilityResponse {
  isAvailable: boolean;
  error?: PrismaError
}

export interface UserCollectionResponse {
  userCount: number;
  users: User[] | null;
  error?: PrismaError
}

export interface PrismaError {
  code: string;
  meta: string | unknown;
  message: string;
}

export enum RESPONSE_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}
