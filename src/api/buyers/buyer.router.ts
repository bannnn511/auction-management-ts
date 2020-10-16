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
  createNewUser,
  deleteUser,
  getAllUsers,
  getUserDetailWithId,
  updateUserInfo,
  updateUserPassword,
} from './buyer.controller';

const userRouter = Router();

/**
 * Get list of user
 * buyers or sellers
 * filter with type and status
 */
userRouter.get('/', validateQuery(paginationSchema), getAllUsers);

/**
 * Get User detail with theirs ID.
 */
userRouter.get('/:id', getUserDetailWithId);

/**
 * Admin can create user or seller.
 */
userRouter.post(
  '/',
  validateBody(createBuyerOrSellerSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  createNewUser,
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
  updateUserInfo,
);

/**
 * Change User password.
 */
userRouter.post(
  '/:id/password',
  validateBody(changeBuyerOrSellerPasswordSchema),
  authentication,
  redisValidation,
  updateUserPassword,
);

/**
 * Delete user by admin.
 */
userRouter.put(
  '/:id/delete',
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  deleteUser,
);

export { userRouter };
