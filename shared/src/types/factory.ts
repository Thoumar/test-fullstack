import { RiskData, TemperatureIncreaseData, TimeFrame } from './timeframe';

export type Factory = {
  id?: string;
  name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearlyRevenue: number;
  riskData?: RiskData;
  temperatureIncreases?: TemperatureIncreaseData;
  riskClassification?: 'HIGH' | 'MEDIUM' | 'LOW';
  temperatureIncrease2090?: number;
  worstTimeframe?: TimeFrame;
};

export type DbFactory = {
  id: string;
  factory_name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearly_revenue: number;
};

export type FactoriesFilters = {
  search?: string;
  country?: string;
  minRevenue?: number;
  maxRevenue?: number;
};

export type FactoryFilterValues = FactoriesFilters[keyof FactoriesFilters];

export type FactoriesPagination = {
  page: number;
  limit: number;
};

export type PaginationOptions = {
  page?: number;
  limit?: number;
};

export type FilterOptions = {
  country?: string;
  minRevenue?: number;
  maxRevenue?: number;
};
