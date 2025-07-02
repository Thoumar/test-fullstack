import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const dbClientPromise = open({
  filename: '../../db.sqlite3',
  driver: sqlite3.Database,
});
