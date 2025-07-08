import { Report } from '@climadex/shared';

import { Box, Typography, Alert } from '@mui/material';

import styles from './RiskClassificationRecommandations.module.sass';

interface RiskClassificationProps {
  riskClassification: Report['riskClassification'];
}

export const RiskClassificationRecommandations = ({ riskClassification }: RiskClassificationProps) => {
  if (riskClassification === undefined) return null;

  return (
    <Box className={styles.riskClassificationRecommandationsContainer}>
      {riskClassification === undefined && (
        <Alert severity="info">
          <Typography variant="h6">No risk classification available yet.</Typography>
          <Typography variant="body1">
            No data is available to provide recommendations at this time. Please check back later.
          </Typography>
        </Alert>
      )}

      {riskClassification === 'HIGH' && (
        <Alert severity="error">
          <Typography variant="h6">Immediate Action Required</Typography>
          <Typography variant="body1">
            This factory faces significant climate risks wriskClassificationRecommandationsContainerith temperature
            increases exceeding 3°C by 2090. Immediate adaptation measures are recommended including infrastructure
            upgrades, cooling systems, and operational adjustments.
          </Typography>
        </Alert>
      )}

      {riskClassification === 'MEDIUM' && (
        <Alert severity="warning">
          <Typography variant="h6">Monitoring and Planning Required</Typography>
          <Typography variant="body1">
            This factory faces moderate climate risks with temperature increases between 1.5-3°C by 2090. Develop
            adaptation plans and monitor conditions regularly.
          </Typography>
        </Alert>
      )}

      {riskClassification === 'LOW' && (
        <Alert severity="success">
          <Typography variant="h6">Low Risk - Continue Monitoring</Typography>
          <Typography variant="body1">
            This factory faces minimal climate risks with temperature increases below 1.5°C by 2090. Continue regular
            monitoring and maintain current operations.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};
