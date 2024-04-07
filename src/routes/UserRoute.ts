import { Router, type Request, type Response } from "express";

export const userRoutes = Router()

userRoutes.get('/', (req: Request, res: Response) => {
  res.send("User router enabled");
})