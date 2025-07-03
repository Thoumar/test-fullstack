import { IFactory } from '@climadex/shared';
import { Context } from 'hono';

export const addFactory = async (c: Context) => {
  const client = c.get('db');

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
};
