import { useEffect, useState } from 'react';

import './FactoriesTable.css';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { IFactory, TIMEFRAMES } from '@climadex/types';
import { RiskLevelCell } from '../../components/RiskLevelCell';

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
    field: `riskLevel${timeframe}`,
    headerName: `Risk level for ${timeframe}`,
    type: 'number',
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <RiskLevelCell params={params} />
    ),
  })),
  {
    field: 'report',
    headerName: 'Report',
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <a href={`/reports/${params.row.id}`} rel="noopener noreferrer">
        View Report
      </a>
    ),
  },
];

const factoryToRowMapper = (factory: IFactory) => ({
  id: factory.id,
  name: factory.name,
  address: factory.address,
  country: factory.country,
  latitude: factory.latitude,
  longitude: factory.longitude,
  yearlyRevenue: factory.yearlyRevenue,
  riskLevel2030: factory.riskData['2030'] ?? 'No data',
  riskLevel2050: factory.riskData['2050'] ?? 'No data',
  riskLevel2070: factory.riskData['2070'] ?? 'No data',
  riskLevel2090: factory.riskData['2090'] ?? 'No data',
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
