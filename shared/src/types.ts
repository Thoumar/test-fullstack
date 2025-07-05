import { TIMEFRAMES } from './constants';

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

export type TimeFrame = (typeof TIMEFRAMES)[number];
