import { Router, type Request, type Response } from "express";
import type { ValidationChain } from "express-validator";

export const categoryRouter = Router();

categoryRouter.get('', (req: Request, res: Response) => {

});

categoryRouter.get('', (req: Request, res: Response) => {

});

// TODO: make const and define values
let createCategoryValidationChain: ValidationChain[] = [

]

categoryRouter.post('', (req: Request, res: Response) => {

});

// TODO: make const and define values
let updateCategoryValidationChain: ValidationChain[] = [

]

categoryRouter.post('', (req: Request, res: Response) => {

});

// TODO: make const and define values
let deleteCategoryValidationChain: ValidationChain[] = [

]

categoryRouter.delete('', (req: Request, res: Response) => {

});
