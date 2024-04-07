import { Router, type Request, type Response } from "express";

export const postRoutes = Router()

postRoutes.get('/', (req: Request, res: Response) => {
  res.send("Post router enabled");
})