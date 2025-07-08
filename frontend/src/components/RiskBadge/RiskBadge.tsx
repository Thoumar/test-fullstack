import clsx from 'clsx';

import { RiskLevel } from '@climadex/shared';

import { Chip, Tooltip } from '@mui/material';

import { useRiskInformations } from 'hooks';

import styles from './RiskBadge.module.sass';

interface RiskBadgeProps {
  riskLevel: RiskLevel;
  temperatureIncrease: number;
  worstTimeframe: string;
}

export function RiskBadge({ riskLevel, temperatureIncrease, worstTimeframe }: RiskBadgeProps) {
  const riskInfo = useRiskInformations(riskLevel);

  const riskLevelStyles = styles[riskInfo.cssClassName];

  const tooltipText = [
    'Temperature increase:',
    `+${temperatureIncrease.toFixed(1)}°C`,
    `by 2090\nWorst timeframe: ${worstTimeframe}`,
  ].join(' ');

  return (
    <Tooltip title={tooltipText} arrow>
      <Chip
        size="small"
        label={`${riskInfo.icon} ${riskLevel} RISK`}
        className={clsx(styles.riskBadge, riskLevelStyles)}
      />
    </Tooltip>
  );
}
