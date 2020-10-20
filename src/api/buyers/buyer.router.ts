import { Router } from 'express';
import { UserType } from '../../shared/helpers/constant';
import {
  changeBuyerOrSellerPasswordSchema,
  createBuyerOrSellerSchema,
  updateUserSchema,
} from './buyer.schema';
import { paginationSchema } from '../../shared/helpers/pagination';
import {
  authentication,
  redisValidation,
  restrictedTo,
  validateBody,
  validateQuery,
} from '../../shared';
import {
  createNewUserController,
  deleteUserController,
  getAllUsersController,
  getUserDetailWithIdController,
  updateUserInfoController,
  updateUserPasswordController,
} from './buyer.controller';

const userRouter = Router();

/**
 * Get list of user
 * buyers or sellers
 * filter with type and status
 */
userRouter.get('/', validateQuery(paginationSchema), getAllUsersController);

/**
 * Get User detail with theirs ID.
 */
userRouter.get('/:id', getUserDetailWithIdController);

/**
 * Admin can create user or seller.
 */
userRouter.post(
  '/',
  validateBody(createBuyerOrSellerSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  createNewUserController,
);

/**
 * Update buyer info
 * change fullname
 * change address
 * request to be a seller
 * accept buyer request - need to be admin.
 */
userRouter.put(
  '/:id',
  validateBody(updateUserSchema),
  authentication,
  redisValidation,
  updateUserInfoController,
);

/**
 * Change User password.
 */
userRouter.post(
  '/:id/password',
  validateBody(changeBuyerOrSellerPasswordSchema),
  authentication,
  redisValidation,
  updateUserPasswordController,
);

/**
 * Delete user by admin.
 */
userRouter.put(
  '/:id/delete',
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  deleteUserController,
);

export { userRouter };
