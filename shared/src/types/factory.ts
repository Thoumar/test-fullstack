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
}

export interface IDbFactory {
  id: string;
  factory_name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearly_revenue: number;
}
