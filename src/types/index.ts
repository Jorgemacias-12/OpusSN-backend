import type { User, UserGetParams } from "../models/User";

export interface GetUsersResponse {
  count: number;
  users: Array<UserGetParams>
}

export enum RESPONSE_CODES {
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404
}