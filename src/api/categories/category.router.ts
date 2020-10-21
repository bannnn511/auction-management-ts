import { Router } from 'express';
import { categorySchema } from './category.schema';
import {
  authentication,
  redisValidation,
  restrictedTo,
  validateBody,
} from '../../shared';
import { UserType } from '../../shared/helpers/constant';
import {
  createNewCategoryController,
  getCategoriesController,
  updateCategoryInfoController,
} from './category.controller';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategoriesController);
categoriesRouter.post(
  '/',
  validateBody(categorySchema),
  redisValidation,
  restrictedTo(UserType.ADMIN),
  createNewCategoryController,
);
categoriesRouter.put(
  '/:id',
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  updateCategoryInfoController,
);
export { categoriesRouter };
