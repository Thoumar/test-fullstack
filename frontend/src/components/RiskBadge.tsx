import { Chip, Tooltip } from '@mui/material';

interface RiskBadgeProps {
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  temperatureIncrease: number;
  worstTimeframe: string;
}

const getRiskStyles = (level: 'HIGH' | 'MEDIUM' | 'LOW') => {
  switch (level) {
    case 'HIGH':
      return {
        backgroundColor: '#ffebee',
        color: '#d32f2f',
        border: '1px solid #ef5350',
        fontWeight: 'bold',
      };
    case 'MEDIUM':
      return {
        backgroundColor: '#fff3e0',
        color: '#f57c00',
        border: '1px solid #ff9800',
        fontWeight: 'bold',
      };
    case 'LOW':
      return {
        backgroundColor: '#e8f5e8',
        color: '#388e3c',
        border: '1px solid #4caf50',
        fontWeight: 'bold',
      };
    default:
      return {};
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

export function RiskBadge({
  riskLevel,
  temperatureIncrease,
  worstTimeframe,
}: RiskBadgeProps) {
  const styles = getRiskStyles(riskLevel);
  const icon = getRiskIcon(riskLevel);

  const tooltipText = `Temperature increase: +${temperatureIncrease.toFixed(
    1
  )}°C by 2090\nWorst timeframe: ${worstTimeframe}`;

  return (
    <Tooltip title={tooltipText} arrow>
      <Chip
        size="small"
        label={`${icon} ${riskLevel} RISK`}
        sx={{
          ...styles,
          cursor: 'help',
        }}
      />
    </Tooltip>
  );
}
