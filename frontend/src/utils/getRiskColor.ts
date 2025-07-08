import { RiskLevel } from '@climadex/shared';

export const getRiskColor = (level: RiskLevel) => {
  const RISK_COLORS = {
    LOW: {
      background: 'rgba(76, 175, 80, 0.25)',
      border: 'rgba(76, 175, 80, 0.5)',
    },
    MEDIUM: {
      background: 'rgba(255, 152, 0, 0.25)',
      border: 'rgba(255, 152, 0, 0.5)',
    },
    HIGH: {
      background: 'rgba(244, 67, 54, 0.25)',
      border: 'rgba(244, 67, 54, 0.5)',
    },
    BASELINE: {
      background: 'rgba(54, 162, 235, 0.25)',
      border: 'rgba(54, 162, 235, 0.5)',
    },
  };

  return RISK_COLORS[level] || RISK_COLORS.BASELINE;
};
