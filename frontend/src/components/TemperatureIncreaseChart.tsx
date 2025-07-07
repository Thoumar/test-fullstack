import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

import { TimeFrame } from '@climadex/shared';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TemperatureIncreaseChartProps {
  riskData: Record<TimeFrame, number>;
  temperatureIncreases: Record<TimeFrame, number>;
  worstTimeframe: TimeFrame;
}

export function TemperatureIncreaseChart({
  riskData,
  temperatureIncreases,
  worstTimeframe,
}: TemperatureIncreaseChartProps) {
  const timeframes = Object.keys(riskData) as TimeFrame[];
  const baseline2030 = riskData['2030'];

  const data = {
    labels: timeframes,
    datasets: [
      {
        label: 'Baseline Temperature (2030)',
        data: timeframes.map(() => baseline2030),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Temperature Increase',
        data: timeframes.map((timeframe) => temperatureIncreases[timeframe]),
        backgroundColor: timeframes.map((timeframe) => {
          const increase = temperatureIncreases[timeframe];
          if (increase > 3) return 'rgba(244, 67, 54, 0.6)'; // Red for HIGH
          if (increase >= 1.5) return 'rgba(255, 152, 0, 0.6)'; // Orange for MEDIUM
          return 'rgba(76, 175, 80, 0.6)'; // Green for LOW
        }),
        borderColor: timeframes.map((timeframe) => {
          const increase = temperatureIncreases[timeframe];
          if (increase > 3) return 'rgba(244, 67, 54, 1)';
          if (increase >= 1.5) return 'rgba(255, 152, 0, 1)';
          return 'rgba(76, 175, 80, 1)';
        }),
        borderWidth: timeframes.map((timeframe) =>
          timeframe === worstTimeframe ? 3 : 1
        ),
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature Evolution and Risk Assessment',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            const timeframe = context.label as TimeFrame;
            const increase = temperatureIncreases[timeframe];
            const total = riskData[timeframe];

            let riskLevel = 'LOW';
            if (increase > 3) riskLevel = 'HIGH';
            else if (increase >= 1.5) riskLevel = 'MEDIUM';

            const worstIndicator =
              timeframe === worstTimeframe ? ' (WORST)' : '';

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
          callback: function (value) {
            return value + '°C';
          },
        },
      },
    },
    interaction: {
      intersect: false,
    },
  };

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <Bar data={data} options={options} />

      {/* Risk threshold indicators */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          border: '1px solid #ddd',
        }}
      >
        <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>
          Risk Thresholds:
        </div>
        <div style={{ color: '#4caf50' }}>
          <span role="img" aria-label="low-risk">
            🟢
          </span>{' '}
          Low: &lt;1.5°C increase
        </div>
        <div style={{ color: '#ff9800' }}>
          <span role="img" aria-label="medium-risk">
            🟡
          </span>{' '}
          Medium: 1.5-3°C increase
        </div>
        <div style={{ color: '#f44336' }}>
          <span role="img" aria-label="high-risk">
            🔴
          </span>{' '}
          High: &gt;3°C increase
        </div>
      </div>
    </div>
  );
}
