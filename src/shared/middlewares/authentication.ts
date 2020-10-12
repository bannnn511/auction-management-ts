import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { getToken } from '../helpers';
import { AppError } from '../utils';
// import { getLoginUserById } from '../../api/Auth/database';
// import { serializeBuyers } from '../../api/Buyers/buyers.serialize';

/**
 * Handle JSON web token.
 * Check header for 'Authorization' field.
 * Check token valid.
 * Check user id exists in database.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function authentication(req: any, res: any, next: any) {
  try {
    if (!req.header('Authorization')) {
      throw new AppError('You need to login', 401, true);
    }
    console.log(req.header('Authorization'));

    const token = getToken(req);
    const secretKey = _.toString(process.env.JWT_SECRET_KEY);
    const data = jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401, true);
      }
      return decoded;
    });

    console.log('Requested from Authorization ☔: ', data);

    // const user = await getLoginUserById(data.id);
    // if (!user) {
    //   throw new AppError('User does not exist', 401, true);
    // }
    // req.currentUser = serializeBuyers(user);

    next();
  } catch (error) {
    next(error);
  }
}
