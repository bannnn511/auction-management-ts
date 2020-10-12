import chalk from 'chalk';
import { AppError } from '../utils';

export function restrictedTo(role: string) {
  return (req: any, res: any, next: any) => {
    try {
      const { type } = req.currentUser;
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
