import { Router, response, type Request, type Response } from "express";
import { body, validationResult, type ValidationChain } from 'express-validator';
import UserController from "../controllers/UsersController";
import { createUserErrorMessages } from "../utils/validationErrors";
import { RESPONSE_CODES, type CheckUsernameAvailabilityResponse, type UserCollectionResponse, type UserCreationResponse, type UserResponse } from "../types";
import type { LoginUser, NewUser, User } from "../models/User";

export const userRouter = Router();

const controller = new UserController();

userRouter.get('/', async (req: Request, res: Response) => {
  const { UserName, CheckIfExists } = req.query;

  // Check if UserName is already taken by another person
  if (CheckIfExists == 'true' &&
    UserName != ''
  ) {
    const response = await controller.CheckIfUsernameIsAvailable(UserName as string) as CheckUsernameAvailabilityResponse;

    if (response.error != null ||
      response.error != undefined
    ) {
      res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(response);

      return;
    }

    res.status(RESPONSE_CODES.OK).json(response);
  }

  // Fetch all users w/o any condition
  const response = await controller.getUsers() as UserCollectionResponse;

  if (response.error != null) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(response);

    return;
  }

  res.status(RESPONSE_CODES.OK).json(response);
});

userRouter.post('/auth', async (req: Request, res: Response) => {

  const { Email, Password } = req.body;

  const userData: LoginUser = {
    Email,
    Password
  }

  const response = await controller.authenticate(userData);

  if (response.error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(response);
  }

  res.status(RESPONSE_CODES.OK).json(response);
});

userRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const parsedId = Number.parseInt(id);

  if (isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
    res.status(RESPONSE_CODES.BAD_REQUEST).json({
      error: `Invalid user ID -> ${id}}`
    });
  }

  const response = await controller.getUser(parsedId);

  if (response.error) {
    return res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(response);
  }

  res.json(response);
});


const createUserValidationChain: ValidationChain[] = [
  body('Name')
    .notEmpty()
    .withMessage(createUserErrorMessages.nameRequired)
    .isLength({ min: 4, max: 50 })
    .withMessage(createUserErrorMessages.nameLength),

  body('LastName')
    .notEmpty()
    .withMessage(createUserErrorMessages.lastnameRequired)
    .isLength({ min: 5, max: 30 })
    .withMessage(createUserErrorMessages.lastnameLength),

  body('Email')
    .notEmpty()
    .withMessage(createUserErrorMessages.emailRequired)
    .isLength({ min: 5, max: 50 })
    .withMessage(createUserErrorMessages.emailLength)
    .isEmail()
    .withMessage(createUserErrorMessages.emailIsNotValid),

  body('UserName')
    .notEmpty()
    .withMessage(createUserErrorMessages.usernameRequired)
    .isLength({ min: 3, max: 15 })
    .withMessage(createUserErrorMessages.usernameLength)
    .matches(/^[a-zA-Z0-9_-ñ]+$/)
    .withMessage(createUserErrorMessages.usernameCharacters)
    .custom(async (value) => {
      let userExists: boolean = false;

      if (userExists) {
        throw new Error(createUserErrorMessages.usernameAlreadyExists);
      }
    }),

  body('Password')
    .notEmpty()
    .withMessage(createUserErrorMessages.passwordRequired)
]

userRouter.post('/', createUserValidationChain, async (req: Request, res: Response) => {
  // Check for errors
  const errors = validationResult(req);

  if (errors != null && !errors.isEmpty()) {
    return res.status(RESPONSE_CODES.BAD_REQUEST).json(errors);
  }

  // Get values from request body with object destruct
  const { Name, LastName, UserName, Email, Password, Role } = req.body;

  // Create NewUser type object
  const newUser: NewUser = {
    Name,
    LastName,
    UserName,
    Email,
    Password,
    Role
  }

  // Send the new user object to controller
  // And get response object
  const result: UserCreationResponse | null = await controller.createUser(newUser);

  if (result === null) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error - 500"
    });

    return;
  }

  // Send result object to client
  res.status(RESPONSE_CODES.CREATED).json(result);
});

userRouter.put('/:id', async (req: Request, res: Response) => {

  const { id } = req.params;

  const parsedId = Number.parseInt(id);

  if (isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
    res.status(RESPONSE_CODES.BAD_REQUEST).json({
      error: `Invalid user ID -> ${id}}`
    });
  }

  // Get values from request body with object destruct
  const { Name, LastName, UserName, Email, Password, Role } = req.body;

  // Create NewUser type object
  const newUser: User = {
    id: Number.parseInt(id),
    Name,
    LastName,
    UserName,
    Email,
    Password,
    Role
  }

  const result = await controller.updateUser(parsedId, newUser);

  res.status(RESPONSE_CODES.OK).json(result);
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const parsedId = Number.parseInt(id);

  if (isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
    res.status(RESPONSE_CODES.BAD_REQUEST).json({
      error: `Invalid user ID -> ${id}}`
    });
  }

  const response = await controller.deleteUser(parsedId);

  console.log(response);

  res.json(RESPONSE_CODES.OK).json(response);
});