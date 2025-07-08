import { RiskData, RiskLevels, TemperatureIncreaseData, TimeFrame, TIMEFRAMES } from '@climadex/shared';

import { classifyRisk } from './classifyRisk';
import { getMeanTemperatureWarmestQuarter } from './getMeanTemperatureWarmestQuarter';

type CalculateRiskParams = {
  latitude: number;
  longitude: number;
};

type CalculateRiskResult = {
  riskData: RiskData;
  temperatureIncreases: TemperatureIncreaseData;
  riskClassification: RiskLevels;
  temperatureIncrease2090: number;
  worstTimeframe: TimeFrame;
};

export const calculateRisk = ({ latitude, longitude }: CalculateRiskParams): CalculateRiskResult => {
  const riskData: RiskData = { '2030': 0, '2050': 0, '2070': 0, '2090': 0 };

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

  const temperatureIncreases: TemperatureIncreaseData = {
    '2030': 0,
    '2050': 0,
    '2070': 0,
    '2090': 0,
  };

  for (const timeframe of TIMEFRAMES) {
    temperatureIncreases[timeframe] = riskData[timeframe] - baseline2030;
  }

  const tempIncrease2090 = temperatureIncreases['2090'];
  const riskClassification = classifyRisk({ base: tempIncrease2090 });

  const worstTimeframe = (Object.entries(temperatureIncreases) as [TimeFrame, number][]).reduce(
    (worst, [timeframe, increase]) => (increase > temperatureIncreases[worst] ? timeframe : worst),
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
