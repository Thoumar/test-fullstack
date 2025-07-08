import { ChartOptions } from 'chart.js';

import { RiskData, TemperatureIncreaseData, TimeFrame } from '@climadex/shared';

import { getRiskLevel } from 'utils';

type GetChartOptionsParams = {
  temperatureIncreases: TemperatureIncreaseData;
  riskData: RiskData;
  worstTimeframe: TimeFrame | undefined;
};

export const getChartOptions = ({
  temperatureIncreases,
  riskData,
  worstTimeframe,
}: GetChartOptionsParams): ChartOptions<'bar'> => ({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        afterLabel: (context) => {
          const timeframe = context.label as TimeFrame;
          const increase = temperatureIncreases[timeframe];
          const total = riskData[timeframe];
          const riskLevel = getRiskLevel(increase).toUpperCase();
          const worstIndicator = timeframe === worstTimeframe ? ' (WORST)' : '';

          return [
            `Total Temperature: ${total.toFixed(1)}°C`,
            `Increase from 2030: +${increase.toFixed(1)}°C`,
            `Risk Level: ${riskLevel}${worstIndicator}`,
          ];
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Timeframe',
        font: {
          weight: 'bold',
        },
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: 'Temperature (°C)',
        font: {
          weight: 'bold',
        },
      },
      ticks: {
        callback: (value) => value + '°C',
      },
    },
  },
  interaction: {
    intersect: false,
  },
});
