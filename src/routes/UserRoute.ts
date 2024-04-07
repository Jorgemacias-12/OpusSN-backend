import { Router, type Request, type Response } from "express";
import { body, validationResult, type ValidationChain } from "express-validator";

export const userRoutes = Router();

const createUserValidationChainExample: ValidationChain[] = [
  body('email').notEmpty().isEmail().withMessage("You need to provide a valid Email"),

]

userRoutes.get('/', (req: Request, res: Response) => {
  res.send("User router enabled");
});

userRoutes.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  res.send(`Fetching user ${id} data`);
});

userRoutes.post('/', createUserValidationChainExample ,(req: Request, res: Response) => {
  
  const errors = validationResult(req);

  if (errors && !errors.isEmpty()) res.status(418).json(errors);

  const response = {
    ...req.body,
    message: "User creation successfully"
  }

  res.json(response);
});
