import { Router, type Request, type Response } from "express";
import { body, validationResult, type ValidationChain } from 'express-validator';
import UserController from "../controllers/UsersController";
import { createUserErrorMessages } from "../utils/validationErrors";
import type { User, UserCreationParams } from "../models/User";
import { RESPONSE_CODES } from "../utils";

export const userRouter = Router();

const controller = new UserController();

//!! Use controller to return the desired json data
userRouter.get('/', (req: Request, res: Response) => {

});

userRouter.get('/:id', (req: Request, res: Response) => {

});


const createUserValidationChain: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage(createUserErrorMessages.nameRequired)
    .isLength({ min: 4, max: 50 })
    .withMessage(createUserErrorMessages.nameLength),

  body('lastname')
    .notEmpty()
    .withMessage(createUserErrorMessages.lastnameRequired)
    .isLength({ min: 5, max: 30 })
    .withMessage(createUserErrorMessages.lastnameLength),

  body('email')
    .notEmpty()
    .withMessage(createUserErrorMessages.emailRequired)
    .isLength({ min: 5, max: 50 })
    .withMessage(createUserErrorMessages.emailLength)
    .isEmail()
    .withMessage(createUserErrorMessages.emailIsNotValid),

  body('username')
    .notEmpty()
    .withMessage(createUserErrorMessages.usernameRequired)
    .isLength({ min: 3, max: 15 })
    .withMessage(createUserErrorMessages.usernameLength)
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(createUserErrorMessages.usernameCharacters)
    .custom(async (value) => {
      // TODO: use prisma to lookup for unique username
      let userExists: boolean = false;

      if (userExists) {
        throw new Error(createUserErrorMessages.usernameAlreadyExists);
      }
    }),

  body('password')
    .notEmpty()
    .withMessage(createUserErrorMessages.passwordRequired)
]

userRouter.post('/', createUserValidationChain, async (req: Request, res: Response) => {
  // Validate request body  
  const errors = validationResult(req);

  if (errors != null && !errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name, lastname, username, email, password, role } = req.body;

  const user: UserCreationParams = {
    name,
    lastname,
    username,
    email,
    password,
    role
  }

  const result = await controller.createUser(user)

  res.status(RESPONSE_CODES.CREATED).json(result);
});

// TODO: make const and define values
let updateUserValidationChain: ValidationChain[] = [

]

userRouter.post('/:id', (req: Request, res: Response) => {

});

// TODO: make const and define values
let deleteUserValidationChain: ValidationChain[] = [

]

userRouter.delete('/:id', (req: Request, res: Response) => {

});