import Joi from 'joi';

export const categorySchema = Joi.object({
  categoryName: Joi.string().required(),
});
