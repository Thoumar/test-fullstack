import { useEffect, useRef } from 'react';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  Tooltip,
  Legend
);

export const RiskLineChart = ({ chartData }) => {
  const chartRef = useRef<ChartJS<'line', (number | null)[], string>>(null);

  useEffect(() => {
    return () => {
      if (ChartJS.getChart('line-chart')) {
        ChartJS.getChart('line-chart')?.destroy();
      }
    };
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: 'Dataset 1',
        data: Object.values(chartData),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Line Chart</h2>
      <Line
        ref={chartRef}
        id="line-chart"
        data={data}
        height={400}
        width={600}
        options={options}
      />
    </div>
  );
};
