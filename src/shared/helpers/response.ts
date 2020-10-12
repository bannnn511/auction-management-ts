import _ from 'lodash';
import chalk from 'chalk';
import util from 'util';
import { AppError } from '../utils';

export function responseSuccess(res: any, data: any, status: number) {
  if (data) {
    console.log(
      chalk.greenBright(
        util.inspect(
          { data, total: _.defaultTo(data.length, 1) },
          { showHidden: false, depth: null },
        ),
      ),
    );
    return res
      .status(_.defaultTo(status, 200))
      .set({ 'x-total-count': _.defaultTo(data.length, 1) })
      .json(data);
  }
  return null;
}

export function responseError(res: any, error: AppError) {
  console.error(
    chalk.yellow(util.inspect({ error }, { showHidden: false, depth: null })),
  );
  return res.status(error.statusCode || 400).json({ error });
}
