import { TimeFrame, TIMEFRAMES } from '@climadex/shared';

import { getMeanTemperatureWarmestQuarter } from './indicators';

type CalculateRiskParams = {
  latitude: number;
  longitude: number;
};

type CalculateRiskResult = {
  riskData: Record<TimeFrame, number>;
  temperatureIncreases: Record<TimeFrame, number>;
  riskClassification: 'HIGH' | 'MEDIUM' | 'LOW';
  temperatureIncrease2090: number;
  worstTimeframe: TimeFrame;
};

const classifyRisk = (tempIncrease2090: number): 'HIGH' | 'MEDIUM' | 'LOW' => {
  if (tempIncrease2090 > 3) return 'HIGH';
  if (tempIncrease2090 >= 1.5) return 'MEDIUM';
  return 'LOW';
};

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

  const baseline2030 = riskData['2030'];

  const temperatureIncreases: Record<TimeFrame, number> = {
    '2030': 0,
    '2050': 0,
    '2070': 0,
    '2090': 0,
  };

  for (const timeframe of TIMEFRAMES) {
    temperatureIncreases[timeframe] = riskData[timeframe] - baseline2030;
  }

  const tempIncrease2090 = temperatureIncreases['2090'];
  const riskClassification = classifyRisk(tempIncrease2090);

  const worstTimeframe = (
    Object.entries(temperatureIncreases) as [TimeFrame, number][]
  ).reduce(
    (worst, [timeframe, increase]) =>
      increase > temperatureIncreases[worst] ? timeframe : worst,
    '2030' as TimeFrame
  );

  return {
    riskData,
    temperatureIncreases,
    riskClassification,
    temperatureIncrease2090: tempIncrease2090,
    worstTimeframe,
  };
};
