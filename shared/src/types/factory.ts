import { TimeFrame } from './timeframe';

export interface Factory {
  id?: string;
  name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearlyRevenue: number;
  riskData?: Record<TimeFrame, number>;
  temperatureIncreases?: Record<TimeFrame, number>;
  riskClassification?: 'HIGH' | 'MEDIUM' | 'LOW';
  temperatureIncrease2090?: number;
  worstTimeframe?: TimeFrame;
}

export interface DbFactory {
  id: string;
  factory_name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearly_revenue: number;
}

export interface FactoriesFilters {
  search?: string;
  country?: string;
  minRevenue?: number;
  maxRevenue?: number;
}

export interface FactoriesPagination {
  page: number;
  limit: number;
}
