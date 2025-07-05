import type { Database } from 'sqlite';

declare module 'hono' {
  interface ContextVariableMap {
    db: Database;
  }
}
