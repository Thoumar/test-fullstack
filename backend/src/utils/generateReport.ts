import { Factory, TimeFrame, TIMEFRAMES } from '@climadex/shared';

import { getMeanTemperatureWarmestQuarter } from '../indicators';

export const generateReport = async (factory: Factory) => {
  const riskData: Record<TimeFrame, number> = {
    '2030': 0,
    '2050': 0,
    '2070': 0,
    '2090': 0,
  };

  for (const timeframe of TIMEFRAMES) {
    const temperature = getMeanTemperatureWarmestQuarter({
      latitude: factory.latitude,
      longitude: factory.longitude,
      timeframe: timeframe as TimeFrame,
    });

    if (temperature !== null) {
      riskData[timeframe] = temperature;
    }
  }

  return {
    ...factory,
    riskData: {
      '2030': riskData['2030'],
      '2050': riskData['2050'],
      '2070': riskData['2070'],
      '2090': riskData['2090'],
    },
  };
};
