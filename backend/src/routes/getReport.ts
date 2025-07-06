import { Context } from 'hono';

import { DatabaseAdapter } from '../adapters/db';
import { FactoryAdapter } from '../adapters/factory';
import { validateRequest } from '../validation/validate';
import { generateReport } from '../utils/generateReport';
import { GetReportParams, getReportParamsSchema } from '../validation/schemas';

export const getReport = async (context: Context) => {
  try {
    const queryParams = { id: context.req.param('id') };

    const validation = validateRequest<GetReportParams>(
      getReportParamsSchema,
      queryParams
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

    const report = generateReport(factory);

    return context.json(report);
  } catch (error) {
    return context.json({ error: 'Internal server error' }, 500);
  }
};
