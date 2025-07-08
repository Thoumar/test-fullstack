import { TemperatureIncreaseData, TimeFrame } from '@climadex/shared';

import { getRiskColor, getRiskLevel } from 'utils';

type GetChartDataParams = {
  timeframes: TimeFrame[];
  baseline2030: number;
  temperatureIncreases: TemperatureIncreaseData;
  worstTimeframe: TimeFrame | undefined;
};

const BASELINE_COLORS = {
  background: 'rgba(54, 162, 235, 0.6)',
  border: 'rgba(54, 162, 235, 1)',
};

export const getChartData = ({
  timeframes,
  baseline2030,
  temperatureIncreases,
  worstTimeframe,
}: GetChartDataParams) => ({
  labels: timeframes,
  datasets: [
    {
      label: 'Baseline Temperature (2030)',
      data: timeframes.map(() => baseline2030),
      backgroundColor: BASELINE_COLORS.background,
      borderColor: BASELINE_COLORS.border,
      borderWidth: 1,
    },
    {
      label: 'Temperature Increase',
      data: timeframes.map((timeframe) => temperatureIncreases[timeframe]),
      backgroundColor: timeframes.map((timeframe) => {
        const riskLevel = getRiskLevel(temperatureIncreases[timeframe]);
        return getRiskColor(riskLevel).background;
      }),
      borderColor: timeframes.map((timeframe) => {
        const riskLevel = getRiskLevel(temperatureIncreases[timeframe]);
        return getRiskColor(riskLevel).border;
      }),
      borderWidth: timeframes.map((timeframe) => (timeframe === worstTimeframe ? 3 : 1)),
    },
  ],
});
