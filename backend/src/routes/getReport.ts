import { Context } from 'hono';

import { IDbFactory, IFactory, TimeFrame, TIMEFRAMES } from '@climadex/shared';

import { getMeanTemperatureWarmestQuarter } from '../indicators';

export const getReport = async (c: Context) => {
  const client = c.get('db');
  const id = c.req.param('id');

  if (!id) {
    return c.json({ error: 'Factory ID is required' }, 400);
  }

  const factory = (await client.get('SELECT * FROM factories WHERE id = ?', [
    id,
  ])) as IDbFactory | undefined;

  if (!factory) {
    return c.json({ error: 'Factory not found' }, 404);
  }

  const riskData: Record<TimeFrame, number> = {
    '2030': 0,
    '2050': 0,
    '2070': 0,
    '2090': 0,
  };

  for (const timeframe of TIMEFRAMES) {
    const temperature = getMeanTemperatureWarmestQuarter({
      latitude: factory.latitude,
      longitude: factory.longitude,
      timeframe: timeframe as TimeFrame,
    });

    if (temperature !== null) {
      riskData[timeframe] = temperature;
    }
  }

  const factoryReport: IFactory = {
    id: factory.id,
    name: factory.factory_name,
    country: factory.country,
    address: factory.address,
    latitude: factory.latitude,
    longitude: factory.longitude,
    yearlyRevenue: factory.yearly_revenue,
    riskData: {
      '2030': riskData['2030'],
      '2050': riskData['2050'],
      '2070': riskData['2070'],
      '2090': riskData['2090'],
    },
  };

  return c.json(factoryReport);
};
