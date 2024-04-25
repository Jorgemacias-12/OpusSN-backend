/**
 * Represents a user in the application.
 * @typedef {Object} User
 * @property {number} id - The unique ID of the user.
 * @property {string} Name - The user's real name.
 * @property {string} LastName - The user's last name.
 * @property {string} UserName - The username for logging in.
 * @property {string} Email - The user's email address.
 * @property {string} Password - The user's password for authentication.
 * @property {number} Role - The user's role in the platform (e.g., 0 for regular user and 1 for moderator).
 */
export interface User {
  id: number;
  Name: string;
  LastName: string;
  UserName: string;
  Email: string;
  Password: string;
  Role: number;
}

/**
 * Represents a safe user object that excludes the password property from the User interface.
 * @typedef {Object} SafeUser
 * @property {number} id - The unique ID of the user.
 * @property {string} Name - The user's real name.
 * @property {string} LastName - The user's last name.
 * @property {string} UserName - The username for logging in.
 * @property {string} Email - The user's email address.
 * @property {number} Role - The user's role in the platform (e.g., 0 for regular user and 1 for moderator).
 */
export interface SafeUser extends Pick<User, "id" | "Name" | "LastName" | "UserName" | "Email" | "Role"> { };

/**
 * Represents a new user object that excludes the ID property from the User interface.
 * @typedef {Object} NewUser
 * @property {string} Name - The user's real name.
 * @property {string} LastName - The user's last name.
 * @property {string} UserName - The username for logging in.
 * @property {string} Email - The user's email address.
 * @property {number} Role - The user's role in the platform (e.g., 0 for regular user and 1 for moderator).
 * @property {string} Password - The user's password for authentication.
 */
export interface NewUser extends Pick<User, "Name" | "LastName" | "UserName" | "Email" | "Role" | "Password"> { };

export interface UserID {
  id: number;
}