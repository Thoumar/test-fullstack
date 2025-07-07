import { Context } from 'hono';

import { Factory } from '@climadex/shared';

import { FactoryAdapter, DatabaseAdapter } from 'adapters';
import {
  validateRequest,
  GetFactoriesQuery,
  getFactoriesSchema,
} from 'validation';

export const getFactories = async (context: Context) => {
  try {
    const params = { q: context.req.query('q') };

    const validation = validateRequest<GetFactoriesQuery>(
      getFactoriesSchema,
      params
    );
    if (validation.data === undefined || !validation.success) {
      return context.json(
        { error: 'Invalid query parameters', details: validation.errors },
        400
      );
    }

    const dbClient = DatabaseAdapter.getClient(context);
    const factoryAdapter = new FactoryAdapter(dbClient);

    const name = validation.data.q?.trim().toLowerCase();
    if (name) {
      const factories = await factoryAdapter.findByName(name);
      return context.json(factories);
    }

    const factories = await factoryAdapter.findAll();
    return context.json<Factory[]>(factories);
  } catch (error) {
    return context.json({ error: 'Internal server error' }, 500);
  }
};
