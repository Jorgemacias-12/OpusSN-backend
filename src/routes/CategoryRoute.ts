import { Router, type Request, type Response } from "express";
import { body, validationResult, type ValidationChain } from 'express-validator';
import { createCategoryErrorMessages } from "../utils/validationErrors";
import { RESPONSE_CODES } from "../types";
import type { Category, NewCategory } from "../models/Category";
import { CategoriesController } from "../controllers/CategoriesController";

export const categoryRouter = Router();

const controller = new CategoriesController();

categoryRouter.get('/', async (req: Request, res: Response) => {
  // Check for existence of category
  const { Category, CheckIfExists } = req.query;

  if (CheckIfExists == 'true' && Category != '') {
    const response = await controller.CheckIfCategoryExists(Category as string);

    if (response.error != null) {
      res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(response);

      return;
    }

    res.status(RESPONSE_CODES.OK).json(response);
  }

  console.log(Category, CheckIfExists);

  const response = await controller.getCategories();

  if (response.error != null) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(response);
  }

  res.status(RESPONSE_CODES.OK).json(response);
});

categoryRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const parsedId = Number.parseInt(id);

  if (isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
    res.status(RESPONSE_CODES.BAD_REQUEST).json({
      error: `Invalid category id ${id}`
    })
  }

  const response = await controller.getCategory(parsedId)

  res.status(RESPONSE_CODES.OK).json(response);
});

const createCategoryValidationChain: ValidationChain[] = [
  body('Name')
    .notEmpty()
    .withMessage(createCategoryErrorMessages.categoryNameRequired)
    .isLength({ min: 3, max: 20 })
    .withMessage(createCategoryErrorMessages.categoryLength)
]

categoryRouter.post('/', createCategoryValidationChain, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (errors != null && !errors.isEmpty()) {
    return res.status(RESPONSE_CODES.BAD_REQUEST).json(errors);
  }

  const { Name } = req.body;

  const newCategory: NewCategory = {
    Name
  }

  const result = await controller.createCategory(newCategory);

  if (result.error != null) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(result);
  }

  res.status(RESPONSE_CODES.CREATED).json(result);
});

categoryRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const parsedId = Number.parseInt(id);

  if (isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
    res.status(RESPONSE_CODES.BAD_REQUEST).json({
      error: `Invalid category id ${id}`
    })
  }

  const response = await controller.deleteCategory(parsedId);

  res.status(RESPONSE_CODES.OK).json(response);
});
