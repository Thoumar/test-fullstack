import { Context } from 'hono';

import { IFactory } from '@climadex/shared';

import { addFactorySchema } from '../validation/schemas';

export const addFactory = async (c: Context) => {
  const client = c.get('db');

  const body = await c.req.json();

  const validation = addFactorySchema.safeParse(body);
  if (!validation.success) {
    return c.json(
      { error: 'Invalid request body', details: validation.error.errors },
      400
    );
  }

  const { name, country, address, latitude, longitude, yearlyRevenue } =
    validation.data;

  const factory: IFactory = {
    name,
    country,
    address,
    latitude,
    longitude,
    yearlyRevenue,
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
};
