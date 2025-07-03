import { Context } from 'hono';
import { IDbFactory } from '../types/factory';
import { IFactory, TimeFrame, TIMEFRAMES } from '@climadex/shared';
import { getMeanTemperatureWarmestQuarter } from '../indicators';

export const getFactories = async (c: Context) => {
  const client = c.get('db');
  const query = c.req.query('q');

  const factories = query
    ? await client.all(
        `SELECT * FROM factories WHERE LOWER( factory_name ) LIKE ?;`,
        [`%${query.toLowerCase()}%`]
      )
    : await client.all('SELECT * FROM factories');

  return c.json(
    factories.map((factory: IDbFactory): IFactory => {
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

      return {
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
      } as IFactory;
    })
  );
};
