import { Schema, ValidationError, ValidationOptions } from 'joi';
import { responseError } from '../helpers';

/**
 * Validate schema using Joi.
 *
 * @export
 * @param {object} value
 * @param {Schema} schema
 * @param {ValidationOptions} options
 * @return {*}
 */
export function validateSchema(
  value: object,
  schema: Schema,
  options?: ValidationOptions,
) {
  return new Promise((resolve, reject) =>
    schema
      .validateAsync(value, options)
      .then(() => resolve(true))
      .catch((errors: ValidationError) => {
        const firstError = errors.details[0];
        const error = {
          code: firstError.type,
          message: firstError.message,
        };

        return reject(error);
      }),
  );
}

function commonValidator(
  schema: Schema,
  key: string,
  options?: ValidationOptions,
) {
  return async (req: any, res: any, next: any) => {
    try {
      const value = req[key];
      await validateSchema(value, schema, options);

      return next();
    } catch (error) {
      console.log('error', error);
      return responseError(res, error);
    }
  };
}

export function validateParams(schema: Schema, options?: ValidationOptions) {
  return commonValidator(schema, 'params', options);
}

export function validateBody(schema: Schema, options?: ValidationOptions) {
  return commonValidator(schema, 'body', options);
}

export function validateQuery(schema: Schema, options?: ValidationOptions) {
  return commonValidator(schema, 'query', {
    ...options,
    allowUnknown: true,
  });
}

export function validateHeader(schema: Schema, options?: ValidationOptions) {
  return commonValidator(schema, 'headers', options);
}
