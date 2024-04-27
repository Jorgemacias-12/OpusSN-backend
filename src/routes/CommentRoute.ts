import { Router, type Request, type Response } from "express";
import { RESPONSE_CODES } from "../types";
import { CommentsControler } from "../controllers/CommentsController";
import { body, type ValidationChain } from "express-validator";
import type { NewComment } from "../models/Comment";

export const commentRouter = Router();

export const controller = new CommentsControler();

commentRouter.get('/', () => {

});

commentRouter.get('/:id', () => {

});

const commentValidationChain: ValidationChain[] = [
  body('Content')
    .notEmpty()
    .withMessage(""),

  body('userId')
    .notEmpty()
    .withMessage(""),
]

commentRouter.post('/', commentValidationChain, async (req: Request, res: Response) => {

  const { userId, Content, postId } = req.body;

  const parsedId = Number.parseInt(postId);

  if (isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
    res.status(RESPONSE_CODES.BAD_REQUEST).json({
      error: `Invalid post id ${postId}`
    })
  }

  const newComment: NewComment = {
    Content,
    userId,
    postId: parsedId,
  };

  const response = await controller.createComment(newComment);

  if (response.error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(response);
  }

  res.status(RESPONSE_CODES.OK).json(response);
});

commentRouter.put('/:id', () => {

});

commentRouter.delete('/:id', () => {
});