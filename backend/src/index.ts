import { serve } from '@hono/node-server';
import { Hono, Context } from 'hono';
import { cors } from 'hono/cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import { IFactory, TimeFrame } from '@climadex/types';
import { IDbFactory, TIMEFRAMES } from './types';

import { getMeanTemperatureWarmestQuarter } from './indicators';

const app = new Hono();

const dbClientPromise = open({
  filename: '../../db.sqlite3',
  driver: sqlite3.Database,
});

app.use('/*', cors());

app.get('/', (c) => {
  // Here is an example of how to read temperatures previsions from the dataset

  const values = [];

  for (const timeframe of TIMEFRAMES) {
    values.push({
      [timeframe]: `${getMeanTemperatureWarmestQuarter({
        latitude: 48.8711312,
        longitude: 2.3462203,
        timeframe: timeframe,
      })}°C`,
    });
  }

  return c.text(
    `Example evolution of temperatures over timeframes : ${JSON.stringify(
      values
    )}`
  );
});

app.get('/factories', async (c: Context) => {
  const client = await dbClientPromise;

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
});

app.post('/factories', async (c: Context) => {
  const client = await dbClientPromise;

  const { name, country, address, latitude, longitude, yearlyRevenue } =
    await c.req.json();
  if (!name || !country || !address || !yearlyRevenue) {
    return c.text('Invalid body.', 400);
  }

  const factory: IFactory = {
    name,
    country,
    address,
    latitude: +latitude,
    longitude: +longitude,
    yearlyRevenue: +yearlyRevenue,
  };

  await client.run(
    `INSERT INTO factories (factory_name, address, country, latitude, longitude, yearly_revenue)
VALUES (?, ?, ?, ?, ?, ?);`,
    factory.name,
    factory.address,
    factory.country,
    factory.latitude,
    factory.longitude,
    factory.yearlyRevenue
  );

  return c.json({ result: 'OK' });
});

serve(app);
