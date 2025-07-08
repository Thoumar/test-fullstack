import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { RiskData, TemperatureIncreaseData, TimeFrame } from '@climadex/shared';

import { Box, Typography } from '@mui/material';

import { RiskLegend } from 'components';

import { getChartData } from './getChartData';
import { getChartOptions } from './getChartOptions';

import styles from './TemperatureIncreaseChart.module.sass';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TemperatureIncreaseChartProps {
  riskData: RiskData;
  temperatureIncreases: TemperatureIncreaseData;
  worstTimeframe: TimeFrame | undefined;
}

export const TemperatureIncreaseChart = ({
  riskData,
  temperatureIncreases,
  worstTimeframe,
}: TemperatureIncreaseChartProps) => {
  const timeframes = Object.keys(riskData) as TimeFrame[];
  const baseline2030 = riskData['2030'];

  const chartData = getChartData({ timeframes, baseline2030, temperatureIncreases, worstTimeframe });
  const chartOptions = getChartOptions({ temperatureIncreases, riskData, worstTimeframe });

  return (
    <Box className={styles.temperatureIncreaseChartContainer}>
      <Typography variant="h6">Temperature Evolution and Risk Assessment</Typography>
      <Box className={styles.chartContainer}>
        <Bar data={chartData} options={chartOptions} />
        <RiskLegend />
      </Box>
    </Box>
  );
};
