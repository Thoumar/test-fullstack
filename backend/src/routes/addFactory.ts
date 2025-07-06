import { Context } from 'hono';

import { Factory } from '@climadex/shared';

import { DatabaseAdapter } from '../adapters/db';
import { FactoryAdapter } from '../adapters/factory';
import { validateRequest } from '../validation/validate';
import { addFactorySchema } from '../validation/schemas';

export const addFactory = async (context: Context) => {
  try {
    const body = await context.req.json();

    const validation = validateRequest<Factory>(addFactorySchema, body);
    if (validation.data === undefined || !validation.success) {
      return context.json(
        { error: 'Invalid request body', details: validation.errors },
        400
      );
    }

    const dbClient = DatabaseAdapter.getClient(context);
    const factoryAdapter = new FactoryAdapter(dbClient);

    const factoryData: Factory = validation.data;
    await factoryAdapter.create(factoryData);

    return context.json({ result: 'OK' });
  } catch (error) {
    return context.json({ error: 'Internal server error' }, 500);
  }
};
