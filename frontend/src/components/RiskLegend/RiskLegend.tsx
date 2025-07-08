import { Box, Typography } from '@mui/material';

import { useRiskInformations } from 'hooks';

import { RiskLegendItem } from './RiskLegenItem';

import styles from './RiskLegend.module.sass';

export const RiskLegend = () => {
  const lowRisk = useRiskInformations('LOW');
  const mediumRisk = useRiskInformations('MEDIUM');
  const highRisk = useRiskInformations('HIGH');

  return (
    <Box className={styles.riskLegend}>
      <Typography className={styles.legendTitle}>Risk Thresholds:</Typography>
      <RiskLegendItem
        icon={lowRisk.icon}
        text={`Low: <${lowRisk.thresholds.medium}°C increase`}
        className={styles.lowRisk}
      />
      <RiskLegendItem
        icon={mediumRisk.icon}
        text={`Medium: ${mediumRisk.thresholds.medium}-${mediumRisk.thresholds.high}°C increase`}
        className={styles.mediumRisk}
      />
      <RiskLegendItem
        icon={highRisk.icon}
        text={`High: >${highRisk.thresholds.high}°C increase`}
        className={styles.highRisk}
      />
    </Box>
  );
};
