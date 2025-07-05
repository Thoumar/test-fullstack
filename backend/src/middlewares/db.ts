import type { MiddlewareHandler } from 'hono';

import { dbClientPromise } from '../db';

export const dbMiddleware: MiddlewareHandler = async (c, next) => {
  const db = await dbClientPromise;
  c.set('db', db);
  await next();
};
