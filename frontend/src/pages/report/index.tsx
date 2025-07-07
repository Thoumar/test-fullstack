import { useParams } from 'react-router-dom';

import { TimeFrame } from '@climadex/shared';

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';

import { useReport } from 'hooks';
import { RiskOverviewCard, TemperatureIncreaseChart } from 'components';

const getRiskLevel = (tempIncrease: number): 'HIGH' | 'MEDIUM' | 'LOW' => {
  if (tempIncrease > 3) return 'HIGH';
  if (tempIncrease >= 1.5) return 'MEDIUM';
  return 'LOW';
};

const getRiskStyles = (level: 'HIGH' | 'MEDIUM' | 'LOW') => {
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

export function ReportPage() {
  const params = useParams();
  const {
    data: report,
    isLoading,
    isError,
    error,
  } = useReport({ id: params.reportId?.toString() || '' });

  console.log('Report data:', report);

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

  if (!report) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Report not found</Alert>
      </Box>
    );
  }

  if (
    !report.riskClassification ||
    !report.temperatureIncreases ||
    !report.riskData
  ) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          Risk data is being calculated. Please refresh the page in a moment.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Factory Climate Risk Report
      </Typography>

      <RiskOverviewCard
        riskClassification={report.riskClassification}
        temperatureIncrease2090={report.temperatureIncrease2090!}
        worstTimeframe={report.worstTimeframe!}
        factoryName={report.name}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          mb: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, height: '100%' }} elevation={1}>
            <Typography variant="h6" component="h3" gutterBottom>
              Location Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box>
                <Typography variant="body1" component="span" fontWeight="bold">
                  Address:
                </Typography>
                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                  {report.address}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="span" fontWeight="bold">
                  Country:
                </Typography>
                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                  {report.country}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="span" fontWeight="bold">
                  Coordinates:
                </Typography>
                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                  {report.latitude}, {report.longitude}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, height: '100%' }} elevation={1}>
            <Typography variant="h6" component="h3" gutterBottom>
              Business Information
            </Typography>
            <Box>
              <Typography variant="body1" component="span" fontWeight="bold">
                Yearly Revenue:
              </Typography>
              <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                ${report.yearlyRevenue?.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Temperature Evolution Chart */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Temperature Evolution and Risk Assessment
        </Typography>
        <Paper sx={{ p: 3 }} elevation={1}>
          <TemperatureIncreaseChart
            riskData={report.riskData}
            temperatureIncreases={report.temperatureIncreases}
            worstTimeframe={report.worstTimeframe!}
          />
        </Paper>
      </Box>

      {/* Detailed Risk Breakdown Table */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Detailed Risk Analysis by Timeframe
        </Typography>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Timeframe</strong>
                </TableCell>
                <TableCell>
                  <strong>Temperature</strong>
                </TableCell>
                <TableCell>
                  <strong>Increase from 2030</strong>
                </TableCell>
                <TableCell>
                  <strong>Risk Level</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(report.riskData).map(
                ([timeframe, temperature]) => {
                  const increase =
                    report.temperatureIncreases![timeframe as TimeFrame];
                  const riskLevel = getRiskLevel(increase);
                  const isWorst = timeframe === report.worstTimeframe;
                  const styles = getRiskStyles(riskLevel);

                  return (
                    <TableRow
                      key={timeframe}
                      sx={{
                        backgroundColor: isWorst
                          ? 'rgba(255, 152, 0, 0.1)'
                          : 'inherit',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight={isWorst ? 'bold' : 'normal'}
                        >
                          {timeframe}
                          {isWorst && ' ⚠️'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {temperature.toFixed(1)}°C
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color={increase > 0 ? 'error.main' : 'text.primary'}
                          fontWeight={increase > 2 ? 'bold' : 'normal'}
                        >
                          +{increase.toFixed(1)}°C
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={riskLevel}
                          sx={{
                            ...styles,
                            fontWeight: 'bold',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {isWorst ? 'Worst affected period' : 'Monitored'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Risk Recommendations */}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Risk Management Recommendations
        </Typography>
        <Paper sx={{ p: 3 }} elevation={1}>
          {report.riskClassification === 'HIGH' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Immediate Action Required
              </Typography>
              <Typography variant="body1">
                This factory faces significant climate risks with temperature
                increases exceeding 3°C by 2090. Immediate adaptation measures
                are recommended including infrastructure upgrades, cooling
                systems, and operational adjustments.
              </Typography>
            </Alert>
          )}

          {report.riskClassification === 'MEDIUM' && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Monitoring and Planning Required
              </Typography>
              <Typography variant="body1">
                This factory faces moderate climate risks with temperature
                increases between 1.5-3°C by 2090. Develop adaptation plans and
                monitor conditions regularly.
              </Typography>
            </Alert>
          )}

          {report.riskClassification === 'LOW' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Low Risk - Continue Monitoring
              </Typography>
              <Typography variant="body1">
                This factory faces minimal climate risks with temperature
                increases below 1.5°C by 2090. Continue regular monitoring and
                maintain current operations.
              </Typography>
            </Alert>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
