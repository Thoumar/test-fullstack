import { RiskLevel } from '@climadex/shared';

export const RISK_THRESHOLDS = {
  medium: 1.5,
  high: 3,
} as const;

export const getRiskLevel = (increase: number): RiskLevel => {
  if (increase > RISK_THRESHOLDS.high) return 'HIGH';
  if (increase >= RISK_THRESHOLDS.medium) return 'MEDIUM';
  return 'LOW';
};
