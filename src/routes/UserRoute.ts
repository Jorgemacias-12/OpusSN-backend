import { Router, response, type Request, type Response } from "express";
import { body, validationResult, type ValidationChain } from 'express-validator';
import UserController from "../controllers/UsersController";
import { createUserErrorMessages } from "../utils/validationErrors";
import { RESPONSE_CODES, type UserCreationResponse } from "../types";
import type { NewUser } from "../models/User";

export const userRouter = Router();

const controller = new UserController();

//!! Use controller to return the desired json data
userRouter.get('/', async (req: Request, res: Response) => {
  // const { username, checkIfExists } = req.query;

  // if (checkIfExists == 'true') {
  //   try {
  //     const isUsernameAvailable = await controller.checkIfUsernameIsAvailable(username as string);

  //     return res.status(RESPONSE_CODES.OK).json({
  //       IsUsernameAvailable: isUsernameAvailable
  //     });
  //   }
  //   catch (err) {
  //     return res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
  //       error: `Error checking for existing username info: ${err}`
  //     });
  //   }
  // }

  // try {
  //   const result = await controller.getUsers();

  //   const { users, count } = result!;

  //   return res.status(RESPONSE_CODES.OK).json({
  //     usersCount: count,
  //     users
  //   })
  // }
  // catch (err) {
  //   return res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
  //     error: `Error getting users info: ${err}`
  //   });
  // }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
  // const { id } = req.params;

  // const response = await controller.getUser(id);

  // if (response === null) {
  //   res.status(RESPONSE_CODES.NOT_FOUND).json({
  //     message: `El usuario con id: ${id} no existe`
  //   })
  // }

  // res.json(response);
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