import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { getFactories } from './routes/getFactories';
import { dbMiddleware } from './middlewares/db';
import { addFactory } from './routes/addFactory';
import './types/hono';

const app = new Hono();

app.use('/*', cors());
app.use('/*', dbMiddleware);

app.get('/factories', getFactories);

app.post('/factories', addFactory);

serve(app);
