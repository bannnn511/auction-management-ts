import Joi from 'joi';

export const FavoriteProductSchema = Joi.object({
  productId: Joi.string().required(),
});

export const FavoriteCategorySchema = Joi.object({
  category: Joi.string().required(),
});
