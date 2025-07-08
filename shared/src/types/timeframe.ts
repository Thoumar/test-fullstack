import { TIMEFRAMES } from './../constants';

export type TimeFrame = (typeof TIMEFRAMES)[number];

export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type TemperatureIncreaseData = Record<TimeFrame, number>;

export type RiskData = Record<TimeFrame, number>;
