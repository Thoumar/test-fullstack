import { Context } from 'hono';

import { generateReport } from 'utils';
import { DatabaseAdapter, FactoryAdapter } from 'adapters';
import { validateRequest, GetReportParams, getReportSchema } from 'validation';

export const getReport = async (context: Context) => {
  try {
    const params = { id: context.req.param('id') };

    const validation = validateRequest<GetReportParams>(
      getReportSchema,
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
    const factory = await factoryAdapter.findById(validation.data.id);

    if (!factory) return context.json({ error: 'Factory not found' }, 404);

    const report = await generateReport(factory);

    return context.json(report);
  } catch (error) {
    return context.json({ error: 'Internal server error' }, 500);
  }
};
