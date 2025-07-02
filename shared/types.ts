export interface IFactory {
  id?: string;
  name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearlyRevenue: number;
}

// TODO: maybe not export TIMEFRAMES but ony types ?
export const TIMEFRAMES = ['2030', '2050', '2070', '2090'] as const;
export type TimeFrame = (typeof TIMEFRAMES)[number];
