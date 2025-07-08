import { RiskLevel } from '@climadex/shared';

export const getRiskIcon = (level: RiskLevel) => {
  switch (level) {
    case 'HIGH':
      return '🔴';
    case 'MEDIUM':
      return '🟡';
    case 'LOW':
      return '🟢';
    default:
      return '';
  }
};
