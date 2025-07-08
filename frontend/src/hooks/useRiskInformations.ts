import { useMemo } from 'react';

import { RiskLevel } from '@climadex/shared';

import { getRiskColor, getRiskDescription, getRiskIcon, RISK_THRESHOLDS } from 'utils';

interface RiskInformationsParams {
  level: RiskLevel;
  color: { background: string; border: string };
  description: string;
  icon: string;
  thresholds: typeof RISK_THRESHOLDS;
  cssClassName: string;
  lowercaseLevel: 'low' | 'medium' | 'high';
}

export const useRiskInformations = (riskLevel: RiskLevel): RiskInformationsParams => {
  return useMemo(() => {
    const color = getRiskColor(riskLevel);
    const description = getRiskDescription(riskLevel);
    const icon = getRiskIcon(riskLevel);
    const cssClassName = riskLevel.toLowerCase();
    const lowercaseLevel = riskLevel.toLowerCase() as 'low' | 'medium' | 'high';

    return {
      level: riskLevel,
      color,
      description,
      icon,
      thresholds: RISK_THRESHOLDS,
      cssClassName,
      lowercaseLevel,
    };
  }, [riskLevel]);
};
