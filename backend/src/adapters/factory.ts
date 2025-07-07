import { Database } from 'sqlite';
import { Database as Driver, Statement } from 'sqlite3';

import { Factory } from '@climadex/shared';

import { calculateRisk } from '../utils';

interface PaginationOptions {
  page?: number;
  limit?: number;
}

interface FilterOptions {
  country?: string;
  minRevenue?: number;
  maxRevenue?: number;
}

interface Options extends PaginationOptions, FilterOptions {}

interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface FactoryRepository {
  create(factory: Factory): Promise<void>;
  findAll(options?: Options): Promise<PaginatedResult<Factory>>;
  findByName(query: string): Promise<Factory[]>;
  findById(id: string): Promise<Factory | undefined>;
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

  async findAll(options: Options = {}): Promise<PaginatedResult<Factory>> {
    const { page = 1, limit = 25 } = options;
    const sanitizedLimit = Math.min(Math.max(1, limit), 100);
    const sanitizedPage = Math.max(1, page);
    const offset = (sanitizedPage - 1) * sanitizedLimit;

    const { whereClause, params } = this.buildWhereClause(options);

    const totalResult = await this.db.get(
      `SELECT COUNT(*) as count FROM factories ${whereClause}`,
      params
    );

    const total = totalResult.count;

    const dbFactories = await this.db.all(
      `SELECT * FROM factories ${whereClause} ORDER BY id LIMIT ? OFFSET ?`,
      [...params, sanitizedLimit, offset]
    );

    const factories = dbFactories.map(this.mapDbFactoryToFactory);
    const totalPages = Math.ceil(total / sanitizedLimit);

    return {
      data: factories,
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
    const dbFactories = await this.db.all(
      `SELECT * FROM factories WHERE LOWER(factory_name) LIKE ?;`,
      [`%${query.toLowerCase()}%`]
    );

    return dbFactories.map(this.mapDbFactoryToFactory);
  }

  async findById(id: string): Promise<Factory | undefined> {
    const dbFactory = await this.db.get(
      'SELECT * FROM factories WHERE id = ?',
      id
    );
    if (!dbFactory) return undefined;

    return this.mapDbFactoryToFactory(dbFactory);
  }

  private buildWhereClause(options: FilterOptions): {
    whereClause: string;
    params: any[];
  } {
    const conditions: string[] = [];
    const params: any[] = [];

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

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    return { whereClause, params };
  }

  private mapDbFactoryToFactory = (dbFactory: any): Factory => {
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
