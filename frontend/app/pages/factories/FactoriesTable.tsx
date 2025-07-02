import { useEffect, useState } from 'react';

import './FactoriesTable.css';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { IFactory, TIMEFRAMES } from '@climadex/types';

async function fetchFactories({
  filterString,
}: {
  filterString: string;
}): Promise<IFactory[]> {
  const url =
    filterString === ''
      ? 'http://localhost:3000/factories'
      : `http://localhost:3000/factories?q=${filterString}`;

  const response = await fetch(url);

  const json = await response.json();

  return json;
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Factory name', flex: 1 },
  { field: 'address', headerName: 'Address', flex: 1 },
  { field: 'country', headerName: 'Country', flex: 1 },
  { field: 'latitude', headerName: 'Latitude', flex: 1 },
  { field: 'longitude', headerName: 'Longitude', flex: 1 },
  {
    field: 'yearlyRevenue',
    headerName: 'Yearly Revenue',
    type: 'number',
    flex: 1,
  },
  ...TIMEFRAMES.map((timeframe) => ({
    field: `meanTemperatureWarmestQuarter${timeframe}`,
    headerName: `Mean Temperature Warmest Quarter ${timeframe}`,
    type: 'number',
    flex: 1,
  })),
];

const factoryToRowMapper = (factory: IFactory) => ({
  id: factory.id,
  name: factory.name,
  address: factory.address,
  country: factory.country,
  latitude: factory.latitude,
  longitude: factory.longitude,
  yearlyRevenue: factory.yearlyRevenue,
  meanTemperatureWarmestQuarter2030: factory?.riskData['2030'] ?? 'No data',
  meanTemperatureWarmestQuarter2050: factory.riskData['2050'] ?? 'No data',
  meanTemperatureWarmestQuarter2070: factory.riskData['2070'] ?? 'No data',
  meanTemperatureWarmestQuarter2090: factory.riskData['2090'] ?? 'No data',
});

export function FactoriesTable({ filterString }: { filterString: string }) {
  const [factories, setFactories] = useState<IFactory[]>([]);

  useEffect(() => {
    fetchFactories({ filterString }).then((json) => setFactories(json));
  }, [filterString]);

  return (
    <DataGrid rows={factories.map(factoryToRowMapper)} columns={columns} />
  );
}
