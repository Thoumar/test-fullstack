import { Database } from 'sqlite';
import { Database as Driver, Statement } from 'sqlite3';

import { Factory } from '@climadex/shared';

interface FactoryRepository {
  create(factory: Factory): Promise<void>;
  findAll(): Promise<Factory[]>;
  findByName(query: string): Promise<Factory[]>;
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

  async findAll(): Promise<Factory[]> {
    const dbFactories = await this.db.all('SELECT * FROM factories');

    return dbFactories.map((dbFactory) => ({
      id: dbFactory.id,
      name: dbFactory.factory_name,
      address: dbFactory.address,
      country: dbFactory.country,
      latitude: dbFactory.latitude,
      longitude: dbFactory.longitude,
      yearlyRevenue: dbFactory.yearly_revenue,
    }));
  }

  async findByName(query: string): Promise<Factory[]> {
    const dbFactories = await this.db.all(
      `SELECT * FROM factories WHERE LOWER(factory_name) LIKE ?;`,
      [`%${query.toLowerCase()}%`]
    );

    return dbFactories.map((dbFactory) => ({
      id: dbFactory.id,
      name: dbFactory.factory_name,
      address: dbFactory.address,
      country: dbFactory.country,
      latitude: dbFactory.latitude,
      longitude: dbFactory.longitude,
      yearlyRevenue: dbFactory.yearly_revenue,
    }));
  }

  async findById(id: string): Promise<Factory | undefined> {
    const dbFactory = await this.db.get(
      'SELECT * FROM factories WHERE id = ?',
      id
    );
    if (!dbFactory) return undefined;

    return {
      id: dbFactory.id,
      name: dbFactory.factory_name,
      address: dbFactory.address,
      country: dbFactory.country,
      latitude: dbFactory.latitude,
      longitude: dbFactory.longitude,
      yearlyRevenue: dbFactory.yearly_revenue,
    };
  }
}
