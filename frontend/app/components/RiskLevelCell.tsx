import Chip from '@mui/material/Chip';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const RiskLevelCell = ({ params }: { params: GridRenderCellParams }) => {
  const temperature = params.value;

  if (
    temperature === null ||
    temperature === undefined ||
    temperature === 'No data'
  ) {
    return <span className="risk-level-no-data">No Data</span>;
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
