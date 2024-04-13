import { Router, type Request, type Response } from "express";
import type { ValidationChain } from "express-validator";

export const postRouter = Router();

postRouter.get('/', (req: Request, res: Response) => {

}); 


postRouter.get('/:id', (req: Request, res: Response) => {

}); 

// TODO: make const and define values
let createPostValidationChain: ValidationChain[] = [

]

postRouter.post('/', (req: Request, res: Response) => {

}); 

// TODO: make const and define values
let updatePostValidationChain: ValidationChain[] = [

]

postRouter.post('/:id', (req: Request, res: Response) => {

}); 

// TODO: make const and define values
let deletePostValidationChain: ValidationChain[] = [

]

postRouter.delete('/:id', (req: Request, res: Response) => {

}); 