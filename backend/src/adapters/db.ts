import { Context } from 'hono';

export class DatabaseAdapter {
  static getClient(c: Context) {
    return c.get('db');
  }
}
