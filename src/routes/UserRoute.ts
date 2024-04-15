import { Router, response, type Request, type Response } from "express";
import { body, validationResult, type ValidationChain } from 'express-validator';
import UserController from "../controllers/UsersController";
import { createUserErrorMessages } from "../utils/validationErrors";
import { RESPONSE_CODES, type CheckUsernameAvailabilityResponse, type UserCollectionResponse, type UserCreationResponse, type UserResponse } from "../types";
import type { NewUser, User } from "../models/User";

export const userRouter = Router();

const controller = new UserController();

//!! Use controller to return the desired json data
userRouter.get('/', async (req: Request, res: Response) => {
  const { UserName, CheckIfExists } = req.query;

  // Check if UserName is already taken by another person
  if (CheckIfExists == 'true' &&
    UserName != ''
  ) {
    const response = await controller.CheckIfUsernameIsAvailable(UserName as string) as CheckUsernameAvailabilityResponse;

    if (response.error != null ||
       response.error != undefined
    ){
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
    .matches(/^[a-zA-Z0-9_-]+$/)
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

// TODO: make const and define values
let updateUserValidationChain: ValidationChain[] = [
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
    .matches(/^[a-zA-Z0-9_-]+$/)
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

userRouter.put('/:id', updateUserValidationChain, async (req: Request, res: Response) => {
  // const { id } = req.params;
  // const { name, lastname, username, email, password, role } = req.body;

  // const user: UserCreationParams = {
  //   name,
  //   lastname,
  //   username,
  //   email,
  //   password,
  //   role
  // }

  // const result = await controller.updateUser(id, user)

  // res.json(result);
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  // const { id } = req.params;

  // const response = await controller.deleteUser(id);

  // if (response === null) {
  //   res.status(RESPONSE_CODES.NOT_FOUND).json({
  //     message: `El usuario con ${id}, no se ha podido eliminar`
  //   })
  // }

  // res.json({
  //   message: "User deleted sucessfully",
  //   userDeletedData: response,
  // });
});