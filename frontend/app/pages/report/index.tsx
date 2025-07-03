import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IFactory } from '@climadex/types';

import Chip from '@mui/material/Chip';
import { RiskLineChart } from '../../components/RiskLineChart';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

async function fetchFactory(id: string): Promise<IFactory> {
  const response = await fetch(`http://localhost:3000/reports/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch factory: ${response.statusText}`);
  }

  return response.json();
}

const getRiskLevel = (temp: number): string => {
  if (temp > 30) return 'HIGH';
  if (temp > 25) return 'MEDIUM';
  return 'LOW';
};

const getRiskStyles = (level: string) => {
  switch (level) {
    case 'HIGH':
      return {
        backgroundColor: '#ffebee',
        color: '#d32f2f',
        border: '1px solid #ef5350',
      };
    case 'MEDIUM':
      return {
        backgroundColor: '#fff3e0',
        color: '#f57c00',
        border: '1px solid #ff9800',
      };
    case 'LOW':
      return {
        backgroundColor: '#e8f5e8',
        color: '#388e3c',
        border: '1px solid #4caf50',
      };
    default:
      return {};
  }
};

const RiskDisplay = ({ temperature }: { temperature: unknown }) => {
  if (
    temperature === null ||
    temperature === undefined ||
    typeof temperature !== 'number'
  ) {
    return <span>No Data</span>;
  }

  const riskLevel = getRiskLevel(temperature);
  const styles = getRiskStyles(riskLevel);

  return (
    <Chip
      size="small"
      label={riskLevel}
      sx={{
        ...styles,
        fontWeight: 'bold',
      }}
    />
  );
};

export function ReportPage() {
  const params = useParams();
  const [factory, setFactory] = useState<IFactory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.reportId) {
      setError('No report ID provided');
      setLoading(false);
      return;
    }

    fetchFactory(params.reportId)
      .then((factoryData) => {
        setFactory(factoryData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [params.reportId]);

  if (loading) {
    return <div>Loading factory report...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!factory) {
    return <div>Factory not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <a href="/factories">
        <ArrowBackRoundedIcon />
        Go back
      </a>
      <h1>Factory Report</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>{factory.name}</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          <div>
            <h3>Location Information</h3>
            <p>
              <strong>Address:</strong> {factory.address}
            </p>
            <p>
              <strong>Country:</strong> {factory.country}
            </p>
            <p>
              <strong>Latitude:</strong> {factory.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {factory.longitude}
            </p>
          </div>

          <div>
            <h3>Business Information</h3>
            <p>
              <strong>Yearly Revenue:</strong> $
              {factory.yearlyRevenue?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {factory.riskData && (
        <div>
          <h3>Risk Assessment by Timeframe</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '15px',
              marginTop: '15px',
            }}
          >
            {Object.entries(factory.riskData).map(([timeframe, riskValue]) => (
              <div
                key={timeframe}
                style={{
                  border: '1px solid #ccc',
                  padding: '15px',
                  borderRadius: '5px',
                }}
              >
                <h4>{timeframe}</h4>
                <RiskDisplay temperature={riskValue} />
                <span>{factory.riskData[timeframe]}°C</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {factory?.riskData && (
        <div style={{ marginTop: '30px' }}>
          <h3>Risk Data</h3>
          <RiskLineChart chartData={factory.riskData} />
        </div>
      )}
    </div>
  );
}
