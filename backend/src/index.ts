import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { serve } from '@hono/node-server';

import { dbMiddleware } from 'middlewares';
import { addFactory, getReport, getFactories } from 'routes';

const app = new Hono();

app.use('/*', cors());
app.use('/*', dbMiddleware);

app.get('/factories', getFactories);

app.get('/reports/:id', getReport);

app.post('/factories', addFactory);

serve(app);
