import { Router, type Request, type Response } from "express";
import type { ValidationChain } from "express-validator";
import { hashPassword } from "../utils";

export const categoryRouter = Router();

categoryRouter.get('', async (req: Request, res: Response) => {
  
  let response = await hashPassword("1234");
  
  res.json({
    text: response,
    length: response.length
  });
  // return await hashPassword("Quelocoxd");
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
