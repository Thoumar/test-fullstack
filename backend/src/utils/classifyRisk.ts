import { RiskLevels } from '@climadex/shared';

type RiskClassificationParams = {
  base: number;
};

export const classifyRisk = ({ base }: RiskClassificationParams): RiskLevels => {
  if (base > 3) return 'HIGH';
  if (base >= 1.5) return 'MEDIUM';
  return 'LOW';
};
