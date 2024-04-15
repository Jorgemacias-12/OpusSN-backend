import type { NewUser, SafeUser } from "../models/User";

export interface UserCreationResponse {
  message: string;
  newUser: SafeUser
}

export enum RESPONSE_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}
