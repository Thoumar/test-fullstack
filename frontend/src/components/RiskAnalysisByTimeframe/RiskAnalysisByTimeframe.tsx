import { Report } from '@climadex/shared';
import { TimeFrame } from '@climadex/shared';

import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';

import { getRiskLevel, getRiskColor } from 'utils';

import styles from './RiskAnalysisByTimeframe.module.sass';

interface RiskAnalysisByTimeframeProps {
  riskData: Report['riskData'];
  temperatureIncreases: Report['temperatureIncreases'];
  worstTimeframe: TimeFrame | undefined;
}

export const RiskAnalysisByTimeframe = ({
  riskData,
  temperatureIncreases,
  worstTimeframe,
}: RiskAnalysisByTimeframeProps) => {
  if (riskData === undefined) return null;

  return (
    <Box className={styles.riskAnalysisContainer}>
      <Typography variant="h6">Detailed Risk Analysis by Timeframe</Typography>
      <TableContainer>
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
            {Object.entries(riskData).map(([timeframe, temperature]) => {
              const increase = temperatureIncreases?.[timeframe as TimeFrame] || 0;
              const riskLevel = getRiskLevel(increase);
              const riskColor = getRiskColor(riskLevel);
              const isWorst = timeframe === worstTimeframe;

              return (
                <TableRow
                  key={timeframe}
                  sx={{
                    backgroundColor: isWorst ? 'rgba(255, 152, 0, 0.1)' : 'inherit',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                >
                  <TableCell>
                    <Typography variant="body1" fontWeight={isWorst ? 'bold' : 'normal'}>
                      {timeframe}
                      {isWorst && ' ⚠️'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{temperature.toFixed(1)}°C</Typography>
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
                        backgroundColor: riskColor.background,
                        color: riskColor.border,
                        border: `1px solid ${riskColor.border}`,
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
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
