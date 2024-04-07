import { Router, type Request, type Response } from "express";

export const categoryRoutes = Router()

categoryRoutes.get('/', (req: Request, res: Response) => {
  res.send("Category router enabled");
})