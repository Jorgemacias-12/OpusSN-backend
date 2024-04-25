import { Router, type Request, type Response } from "express";
import { body, validationResult, type ValidationChain } from "express-validator";
import { createPostErrorMessages } from "../utils/validationErrors";
import { RESPONSE_CODES } from "../types";
import type { NewPost } from "../models/Post";
import { PostsController } from "../controllers/PostsController";
import { isValidDate } from "../utils";
import type { UserID } from "../models/User";

export const postRouter = Router();

const controller = new PostsController();

postRouter.get('/', async (req: Request, res: Response) => {

});


postRouter.get('/:id', async (req: Request, res: Response) => {

});

const postValidationChain: ValidationChain[] = [
  body('Title')
    .notEmpty()
    .withMessage(createPostErrorMessages.postTitleRequired)
    .isLength({ min: 5, max: 40 })
    .withMessage(createPostErrorMessages.postTitleLength),

  body('Content')
    .notEmpty()
    .withMessage(createPostErrorMessages.postContentRequired),

  body('CreationDate')
    .notEmpty()
    .withMessage(createPostErrorMessages.postDateRequired)
    .custom((value) => !isValidDate(value))
    .withMessage(createPostErrorMessages.postIsValidDate),

  body('PostCategory')
    .notEmpty()
    .withMessage(createPostErrorMessages.postCategoryRequired)
]

postRouter.post('/', postValidationChain, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (errors != null && !errors.isEmpty()) {
    return res.status(RESPONSE_CODES.BAD_REQUEST).json(errors);
  }

  const { Title, Content, CreationDate, UpdateDate, PostCategory, User } = req.body;

  const newPost: NewPost = {
    Title,
    Content,
    CreationDate,
    UpdateDate,
    PostCategory,
    User
  }

  const result = await controller.createPost(newPost);

  if (result.error != null) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(result);
  }

  res.status(RESPONSE_CODES.CREATED).json(result);
});

postRouter.put('/:id', postValidationChain, async (req: Request, res: Response) => {

});

postRouter.delete('/:id', async (req: Request, res: Response) => {

}); 