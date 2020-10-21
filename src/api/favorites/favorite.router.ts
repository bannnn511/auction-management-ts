import { Router } from 'express';
import {
  validateBody,
  authentication,
  redisValidation,
} from '../../shared/middlewares';
import {
  addCategoryToFavoriteController,
  addProductToFavoriteController,
  getFavoriteProductOrCategoryController,
} from './favorite.controller';
import {
  FavoriteCategorySchema,
  FavoriteProductSchema,
} from './favorite.schema';

const favoriteRouter = Router();

favoriteRouter.post(
  '/',
  validateBody(FavoriteProductSchema),
  authentication,
  redisValidation,
  addProductToFavoriteController,
);

favoriteRouter.post(
  '/category',
  validateBody(FavoriteCategorySchema),
  authentication,
  redisValidation,
  addCategoryToFavoriteController,
);

favoriteRouter.get(
  '/',
  authentication,
  redisValidation,
  getFavoriteProductOrCategoryController,
);

export { favoriteRouter };
