import { TimeFrame } from '@climadex/shared';

import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';

interface RiskOverviewCardProps {
  riskClassification: 'HIGH' | 'MEDIUM' | 'LOW';
  temperatureIncrease2090: number;
  worstTimeframe: TimeFrame;
  factoryName: string;
}

const getRiskColor = (level: 'HIGH' | 'MEDIUM' | 'LOW') => {
  switch (level) {
    case 'HIGH':
      return '#d32f2f';
    case 'MEDIUM':
      return '#f57c00';
    case 'LOW':
      return '#388e3c';
    default:
      return '#666';
  }
};

const getRiskIcon = (level: 'HIGH' | 'MEDIUM' | 'LOW') => {
  switch (level) {
    case 'HIGH':
      return '🔴';
    case 'MEDIUM':
      return '🟡';
    case 'LOW':
      return '🟢';
    default:
      return '';
  }
};

const getRiskDescription = (level: 'HIGH' | 'MEDIUM' | 'LOW') => {
  switch (level) {
    case 'HIGH':
      return 'This factory faces significant climate risks that require immediate attention and adaptation measures.';
    case 'MEDIUM':
      return 'This factory faces moderate climate risks that should be monitored and planned for.';
    case 'LOW':
      return 'This factory faces minimal climate risks based on current projections.';
    default:
      return '';
  }
};

export function RiskOverviewCard({
  riskClassification,
  temperatureIncrease2090,
  worstTimeframe,
  factoryName,
}: RiskOverviewCardProps) {
  const riskColor = getRiskColor(riskClassification);
  const riskIcon = getRiskIcon(riskClassification);
  const riskDescription = getRiskDescription(riskClassification);

  // Calculate progress value for visual indicator (0-100)
  const progressValue = Math.min((temperatureIncrease2090 / 5) * 100, 100);

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${riskColor}15, ${riskColor}05)`,
        border: `2px solid ${riskColor}30`,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="span" sx={{ mr: 2 }}>
            {riskIcon}
          </Typography>
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{ color: riskColor, fontWeight: 'bold' }}
            >
              {riskClassification} RISK
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Climate Risk Assessment for {factoryName}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {riskDescription}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{ color: riskColor, fontWeight: 'bold' }}
            >
              +{temperatureIncrease2090.toFixed(1)}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Temperature increase by 2090
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{ color: riskColor, fontWeight: 'bold' }}
            >
              {worstTimeframe}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Worst affected timeframe
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Risk Intensity
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: `${riskColor}20`,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: riskColor,
                  borderRadius: 4,
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {progressValue.toFixed(0)}% of extreme risk threshold
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
