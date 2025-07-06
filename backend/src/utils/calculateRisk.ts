import { TimeFrame, TIMEFRAMES } from '@climadex/shared';

import { getMeanTemperatureWarmestQuarter } from '../indicators';

type CalculateRiskParams = {
  latitude: number;
  longitude: number;
};

type CalculateRiskResult = Record<TimeFrame, number>;

export const calculateRisk = ({
  latitude,
  longitude,
}: CalculateRiskParams): CalculateRiskResult => {
  const riskData: Record<TimeFrame, number> = {
    '2030': 0,
    '2050': 0,
    '2070': 0,
    '2090': 0,
  };

  for (const timeframe of TIMEFRAMES) {
    const temperature = getMeanTemperatureWarmestQuarter({
      latitude,
      longitude,
      timeframe: timeframe as TimeFrame,
    });

    if (temperature !== null) {
      riskData[timeframe] = temperature;
    }
  }

  return riskData;
};
