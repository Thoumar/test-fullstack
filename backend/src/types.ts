export interface IDbFactory {
  id: string;
  factory_name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearly_revenue: number;
}

export const TIMEFRAMES = ['2030', '2050', '2070', '2090'] as const;
export type TimeFrame = (typeof TIMEFRAMES)[number];
