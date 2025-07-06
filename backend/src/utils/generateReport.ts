import gdal from 'gdal-async';

import { Factory, TimeFrame, TIMEFRAMES } from '@climadex/shared';

const wgs84 = gdal.SpatialReference.fromEPSG(4326);

const getMeanTemperatureWarmestQuarter = ({
  latitude,
  longitude,
  timeframe,
}: {
  latitude: number;
  longitude: number;
  timeframe: TimeFrame;
}): number | null => {
  const dataset = gdal.open(`../assets/${timeframe}.tif`);
  const xform = new gdal.CoordinateTransformation(wgs84, dataset);

  const coords = xform.transformPoint(longitude, latitude);
  const x = Math.floor(coords.x);
  const y = Math.floor(coords.y);

  const band = dataset.bands.get(1);

  const value = +band.pixels.get(x, y);

  if (value < -10000 || isNaN(value)) {
    return null;
  }

  return Math.round(value * 100) / 100;
};

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
