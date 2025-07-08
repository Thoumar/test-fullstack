import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { useReport } from 'hooks';
import {
  Loading,
  Error,
  RiskAnalysisByTimeframe,
  RiskClassificationRecommandations,
  RiskOverviewCard,
  TemperatureIncreaseChart,
} from 'components';

import styles from './ReportPage.module.sass';

export function ReportPage() {
  const params = useParams();
  const { report, isLoading, isError, error } = useReport({ id: params.reportId || '' });

  if (isLoading) return <Loading text="Loading factory report..." />;

  if (!params.reportId) return <Error text="No report ID provided" />;

  if (isError) return <Error text={`Error loading report: ${error?.message}`} />;

  if (!report) return <Error text="Report not found" />;

  return (
    <Box className={styles.reportContainer}>
      <Typography variant="h5">Factory Climate Risk Report</Typography>

      {report.riskClassification && (
        <RiskOverviewCard
          riskClassification={report.riskClassification}
          temperatureIncrease2090={report.temperatureIncrease2090}
          worstTimeframe={report.worstTimeframe}
          factoryName={report.name}
        />
      )}

      <RiskClassificationRecommandations riskClassification={report.riskClassification} />

      {report.riskData && report.temperatureIncreases && (
        <TemperatureIncreaseChart
          riskData={report.riskData}
          temperatureIncreases={report.temperatureIncreases}
          worstTimeframe={report.worstTimeframe}
        />
      )}

      <RiskAnalysisByTimeframe
        riskData={report.riskData}
        temperatureIncreases={report.temperatureIncreases}
        worstTimeframe={report.worstTimeframe}
      />
    </Box>
  );
}
