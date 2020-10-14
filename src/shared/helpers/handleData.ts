/* eslint-disable radix */
import { Request } from 'express';
import _ from 'lodash';

export function safeParseFloat(input: number, defaultValue: number) {
  if (!input || typeof input === 'number') {
    return input || defaultValue;
  }

  return parseFloat(input);
}

export function safeParseInt(input: number, defaultValue: number) {
  if (!input || typeof input === 'number') {
    return Math.floor(input || defaultValue);
  }

  return parseInt(input, 0);
}

export function isEmptyObject(input: any) {
  return (
    !input ||
    (typeof input === 'object' &&
      !Array.isArray(input) &&
      Object.keys(input).length === 0)
  );
}

export function safeParseJSON(input: string, defaultValue = {}) {
  const result = typeof input === 'string' ? JSON.parse(input) : input;

  return result || defaultValue;
}

export function toISOString(input: Date) {
  if (!input) {
    return null;
  }

  return typeof input === 'string' ? input : input.toISOString();
}

export function toDateString(input: Date) {
  if (!input) {
    return null;
  }
  const date = new Date(input);

  return date.toLocaleString();
}

export function getToken(req: Request) {
  if (req.header('Authorization')) {
    const header = _.defaultTo(req.header('Authorization'), '');
    return header.replace('Bearer', '').replace(/\s/g, '');
  }
  return null;
}
