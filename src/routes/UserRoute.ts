import { Router, type Request, type Response } from "express";
import { type ValidationChain } from 'express-validator';
import UserController from "../controllers/UsersController";

export const userRouter = Router();

const controller = new UserController();

//!! Use controller to return the desired json data
userRouter.get('/', (req: Request, res: Response) => {
  
});

userRouter.get('/:id', (req: Request, res: Response) => {

});

// TODO: make const and define values
let createUserValidationChain: ValidationChain[] = [

]

userRouter.post('/', createUserValidationChain, (req: Request, res: Response) => {

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