import { Response } from 'express';
import _ from 'lodash';
import chalk from 'chalk';
import util from 'util';
import { AppError } from '../utils';

export function responseSuccess(res: Response, data: any, status?: number) {
  if (data) {
    console.log({
      data,
      total: _.defaultTo(data.length, 1),
    });
    return res
      .status(_.defaultTo(status, 200))
      .set({ 'x-total-count': _.defaultTo(data.length, 1) })
      .json(data);
  }
  return null;
}

export function responseError(res: Response, error: AppError) {
  console.error(
    chalk.yellow(util.inspect({ error }, { showHidden: false, depth: null })),
  );
  return res.status(error.statusCode || 400).json({ error });
}
