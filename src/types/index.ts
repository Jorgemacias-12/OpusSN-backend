import type { User, UserGetParams } from "../models/User";

export interface GetUsersResponse {
  count: number;
  users: Array<UserGetParams>
}