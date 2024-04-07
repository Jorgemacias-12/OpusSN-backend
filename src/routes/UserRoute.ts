import { Router, type Request, type Response } from "express";

export const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response) => {
  res.send("User router enabled");
});

userRoutes.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  res.send(`Fetching user ${id} data`);
});

userRoutes.post('/', (req: Request, res: Response) => {
  
  const response = {
    ...req.body,
    message: "User creation successfully"
  }

  res.json(response);
});
