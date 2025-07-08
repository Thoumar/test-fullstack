import { RiskLevel, TimeFrame } from '@climadex/shared';

import { Typography, Box, LinearProgress } from '@mui/material';

import { useRiskInformations } from 'hooks';

import styles from './RiskOverviewCard.module.sass';

interface RiskOverviewCardProps {
  riskClassification: RiskLevel;
  temperatureIncrease2090: number | undefined;
  worstTimeframe: TimeFrame | undefined;
  factoryName: string;
}

export function RiskOverviewCard({
  riskClassification,
  temperatureIncrease2090,
  worstTimeframe,
  factoryName,
}: RiskOverviewCardProps) {
  const riskInfo = useRiskInformations(riskClassification);
  const progressValue = temperatureIncrease2090 ? Math.min((temperatureIncrease2090 / 5) * 100, 100) : 0;

  return (
    <Box
      className={styles.card}
      sx={{
        background: `linear-gradient(135deg, ${riskInfo.color.background}, ${riskInfo.color.background})`,
        border: `2px solid ${riskInfo.color.border}`,
      }}
    >
      <Box className={styles.header}>
        <Box className={styles.riskIcon}>
          <Typography component="span">{riskInfo.icon}</Typography>
        </Box>
        <Box>
          <Typography className={styles.riskTitle} sx={{ color: riskInfo.color.border }}>
            {riskClassification} RISK
          </Typography>
          <Typography className={styles.subtitle}>Climate Risk Assessment for {factoryName}</Typography>
        </Box>
      </Box>

      <Box className={styles.description}>
        <Typography>{riskInfo.description}</Typography>
      </Box>

      <Box className={styles.statsGrid}>
        {temperatureIncrease2090 && (
          <Box>
            <Typography component="h3" className={styles.statValue} sx={{ color: riskInfo.color.border }}>
              +{temperatureIncrease2090.toFixed(1)}°C
            </Typography>
            <Typography className={styles.statLabel}>Temperature increase by 2090</Typography>
          </Box>
        )}

        {worstTimeframe && (
          <Box>
            <Typography component="h3" className={styles.statValue} sx={{ color: riskInfo.color.border }}>
              {worstTimeframe}
            </Typography>
            <Typography className={styles.statLabel}>Worst affected timeframe</Typography>
          </Box>
        )}

        <Box>
          <Typography className={styles.statLabel}>Risk Intensity</Typography>
          <Box className={styles.progressContainer}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              className={styles.progressBar}
              sx={{
                backgroundColor: `${riskInfo.color.border}20`,
                '--progress-color': riskInfo.color.border,
              }}
            />
          </Box>
          <Typography className={styles.progressCaption}>
            {progressValue.toFixed(0)}% of extreme risk threshold
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
