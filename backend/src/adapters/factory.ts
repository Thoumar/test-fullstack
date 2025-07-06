import { Database } from 'sqlite';
import { Database as Driver, Statement } from 'sqlite3';

import { Factory } from '@climadex/shared';

interface FactoryRepository {
  create(factory: Factory): Promise<void>;
}

export class FactoryAdapter implements FactoryRepository {
  constructor(private db: Database<Driver, Statement>) {}

  async create(factory: Factory): Promise<void> {
    await this.db.run(
      `INSERT INTO factories (factory_name, address, country, latitude, longitude, yearly_revenue)
       VALUES (?, ?, ?, ?, ?, ?);`,
      factory.name,
      factory.address,
      factory.country,
      factory.latitude,
      factory.longitude,
      factory.yearlyRevenue
    );
  }
}
