import { Context } from 'hono';

export class DatabaseAdapter {
  static getClient(context: Context) {
    return context.get('db');
  }
}
