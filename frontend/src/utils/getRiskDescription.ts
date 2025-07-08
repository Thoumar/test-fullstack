import { RiskLevel } from '@climadex/shared';

export const getRiskDescription = (level: RiskLevel) => {
  switch (level) {
    case 'HIGH':
      return 'This factory faces significant climate risks that require immediate attention and adaptation measures.';
    case 'MEDIUM':
      return 'This factory faces moderate climate risks that should be monitored and planned for.';
    case 'LOW':
      return 'This factory faces minimal climate risks based on current projections.';
    default:
      return '';
  }
};
