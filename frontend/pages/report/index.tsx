import { useParams } from 'react-router-dom';

import {
  Box,
  Typography,
  Chip,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { RiskLineChart } from '../../components/RiskLineChart';
import { useReport } from '../../hooks';

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
    return <Typography variant="body2">No Data</Typography>;
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
  const {
    data: factory,
    isLoading,
    isError,
    error,
  } = useReport(params.reportId || '');

  if (!params.reportId) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">No report ID provided</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress />
          <Typography variant="h6">Loading factory report...</Typography>
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {error?.message || 'Failed to load factory report'}
        </Alert>
      </Box>
    );
  }

  if (!factory) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Factory not found</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {factory.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            mt: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, height: '100%' }} elevation={0}>
              <Typography variant="h5" component="h3" gutterBottom>
                Location Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box>
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight="bold"
                  >
                    Address:
                  </Typography>
                  <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {factory.address}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight="bold"
                  >
                    Country:
                  </Typography>
                  <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {factory.country}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight="bold"
                  >
                    Latitude:
                  </Typography>
                  <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {factory.latitude}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight="bold"
                  >
                    Longitude:
                  </Typography>
                  <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {factory.longitude}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, height: '100%' }} elevation={0}>
              <Typography variant="h5" component="h3" gutterBottom>
                Business Information
              </Typography>
              <Box>
                <Typography variant="body1" component="span" fontWeight="bold">
                  Yearly Revenue:
                </Typography>
                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                  ${factory.yearlyRevenue?.toLocaleString()}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>

      {factory.riskData && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Risk Assessment by Timeframe
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 2,
              mt: 1,
            }}
          >
            {Object.entries(factory.riskData).map(([timeframe, riskValue]) => (
              <Paper
                elevation={0}
                key={timeframe}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  height: '100%',
                }}
              >
                <Typography variant="h6" component="h4">
                  {timeframe}
                </Typography>
                <RiskDisplay temperature={riskValue} />
                <Typography variant="body2">{riskValue}°C</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      {factory?.riskData && (
        <Box>
          <Typography variant="h5" component="h3" gutterBottom>
            Risk Data
          </Typography>
          <Paper sx={{ p: 3, mt: 2 }} elevation={0}>
            <RiskLineChart chartData={factory.riskData} />
          </Paper>
        </Box>
      )}
    </Box>
  );
}
