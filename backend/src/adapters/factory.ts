import { Database } from 'sqlite';
import { Database as Driver, Statement } from 'sqlite3';

import { DbFactory, Factory, FilterOptions, PaginationOptions } from '@climadex/shared';

import { calculateRisk, sanitizePagination } from 'utils';

interface PaginatedResult<T> {
  factories: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

type Options = PaginationOptions & FilterOptions;

type FactoryRepository = {
  create(factory: Factory): Promise<void>;
  findAll(options?: Options): Promise<PaginatedResult<Factory>>;
  findByName(query: string): Promise<Factory[]>;
  findById(id: string): Promise<Factory | undefined>;
};

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

  async findAll(options: Options): Promise<PaginatedResult<Factory>> {
    const { page = 1, limit = 20 } = options;
    const { sanitizedLimit, sanitizedPage, offset } = sanitizePagination({
      page,
      limit,
    });

    const { whereClause, params } = this.buildWhereClause(options);

    const totalResult = await this.db.get(`SELECT COUNT(*) as count FROM factories ${whereClause}`, params);

    const total = totalResult.count;

    const dbFactories = await this.db.all(`SELECT * FROM factories ${whereClause} ORDER BY id LIMIT ? OFFSET ?`, [
      ...params,
      sanitizedLimit,
      offset,
    ]);

    const factories = dbFactories.map(this.mapDbFactoryToFactory);
    const totalPages = Math.ceil(total / sanitizedLimit);

    return {
      factories,
      pagination: {
        page: sanitizedPage,
        limit: sanitizedLimit,
        total,
        totalPages,
        hasNext: sanitizedPage < totalPages,
        hasPrev: sanitizedPage > 1,
      },
    };
  }

  async findByName(query: string): Promise<Factory[]> {
    const dbFactories = await this.db.all(`SELECT * FROM factories WHERE LOWER(factory_name) LIKE ?;`, [
      `%${query.toLowerCase()}%`,
    ]);

    return dbFactories.map(this.mapDbFactoryToFactory);
  }

  async findById(id: string): Promise<Factory | undefined> {
    const dbFactory = await this.db.get('SELECT * FROM factories WHERE id = ?', id);

    return dbFactory ? this.mapDbFactoryToFactory(dbFactory) : undefined;
  }

  private buildWhereClause(options: FilterOptions): {
    whereClause: string;
    params: FilterOptions[keyof FilterOptions][];
  } {
    const conditions: string[] = [];
    const params: FilterOptions[keyof FilterOptions][] = [];

    if (options.country) {
      conditions.push('LOWER(country) = ?');
      params.push(options.country.toLowerCase());
    }

    if (options.minRevenue !== undefined) {
      conditions.push('yearly_revenue >= ?');
      params.push(options.minRevenue);
    }

    if (options.maxRevenue !== undefined) {
      conditions.push('yearly_revenue <= ?');
      params.push(options.maxRevenue);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    return { whereClause, params };
  }

  private mapDbFactoryToFactory = (dbFactory: DbFactory): Factory => {
    const riskCalculation = calculateRisk({
      latitude: dbFactory.latitude,
      longitude: dbFactory.longitude,
    });

    return {
      id: dbFactory.id,
      name: dbFactory.factory_name,
      address: dbFactory.address,
      country: dbFactory.country,
      latitude: dbFactory.latitude,
      longitude: dbFactory.longitude,
      yearlyRevenue: dbFactory.yearly_revenue,
      riskData: riskCalculation.riskData,
      temperatureIncreases: riskCalculation.temperatureIncreases,
      riskClassification: riskCalculation.riskClassification,
      temperatureIncrease2090: riskCalculation.temperatureIncrease2090,
      worstTimeframe: riskCalculation.worstTimeframe,
    };
  };
}
