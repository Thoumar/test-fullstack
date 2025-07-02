import { dbClientPromise } from '../db';
import type { MiddlewareHandler } from 'hono';

export const dbMiddleware: MiddlewareHandler = async (c, next) => {
  const db = await dbClientPromise;
  c.set('db', db);
  await next();
};
