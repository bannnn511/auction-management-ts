import { Request, Response } from 'express';
import chalk from 'chalk';
import _ from 'lodash';
import { AppError } from '../utils';

/**
 * A middleware for authorization
 * Check if user's current role have enough authority
 * to go to the next middleware.
 *
 * @export
 * @param {string} role - The minimum role authority to grant access.
 */
export function restrictedTo(role: string) {
  return (req: Request, res: Response, next: any) => {
    try {
      const type = _.get(req, 'currentUser.type');
      if (type === role) {
        console.log(chalk.cyan('Access granted'));
        next();
      } else {
        console.log(chalk.yellow('Access denied'));
        throw new AppError(`Authority denied, you are not ${role}`, 403, true);
      }
    } catch (error) {
      next(error);
    }
  };
}
