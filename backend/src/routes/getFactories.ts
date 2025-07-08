import { Context } from 'hono';

import { FactoryAdapter, DatabaseAdapter } from 'adapters';
import { validateRequest, GetFactoriesQuery, getFactoriesSchema } from 'validation';

export const getFactories = async (context: Context) => {
  try {
    const validation = validateRequest<GetFactoriesQuery>(getFactoriesSchema, {
      q: context.req.query('q'),
      page: context.req.query('page'),
      limit: context.req.query('limit'),
      country: context.req.query('country'),
      minRevenue: context.req.query('minRevenue'),
      maxRevenue: context.req.query('maxRevenue'),
    });

    if (validation.data === undefined || !validation.success) {
      return context.json({ error: 'Invalid query parameters', details: validation.errors }, 400);
    }

    const dbClient = DatabaseAdapter.getClient(context);
    const factoryAdapter = new FactoryAdapter(dbClient);

    const { q: searchQuery, page, limit, country, minRevenue, maxRevenue } = validation.data;

    const name = searchQuery?.trim().toLowerCase();
    if (name) {
      const factories = await factoryAdapter.findByName(name);
      const total = factories.length;
      const parsedPage = page ? parseInt(page, 10) : 1;
      const parsedLimit = limit ? parseInt(limit, 10) : 20;

      const startIndex = (parsedPage - 1) * parsedLimit;
      const endIndex = startIndex + parsedLimit;
      const paginatedFactories = factories.slice(startIndex, endIndex);
      const totalPages = Math.ceil(total / parsedLimit);

      return context.json({
        factories: paginatedFactories,
        pagination: {
          page: parsedPage,
          limit: parsedLimit,
          total,
          totalPages,
          hasNext: parsedPage < totalPages,
          hasPrev: parsedPage > 1,
        },
      });
    }

    const parsedPage = page ? parseInt(page, 10) : undefined;
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    const parsedMinRevenue = minRevenue ? parseFloat(minRevenue) : undefined;
    const parsedMaxRevenue = maxRevenue ? parseFloat(maxRevenue) : undefined;

    const result = await factoryAdapter.findAll({
      page: parsedPage,
      limit: parsedLimit,
      country: country || undefined,
      minRevenue: parsedMinRevenue,
      maxRevenue: parsedMaxRevenue,
    });

    return context.json(result);
  } catch (error) {
    console.error('Error in getFactories:', error);
    return context.json({ error: 'Internal server error' }, 500);
  }
};
