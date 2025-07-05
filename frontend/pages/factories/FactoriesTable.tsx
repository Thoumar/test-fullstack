import { useEffect, useState } from 'react';

import './FactoriesTable.css';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

import { IFactory, TIMEFRAMES, TimeFrame } from '@climadex/shared';

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

function renderSparklineCell(params: GridRenderCellParams) {
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        color="hsl(210, 98%, 42%)"
        xAxis={{
          scaleType: 'band',
          data: TIMEFRAMES,
        }}
      />
    </div>
  );
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
  {
    field: 'riskLevels',
    headerName: 'Risk Levels',
    flex: 1,
    renderCell: renderSparklineCell,
  },
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
  riskLevels: TIMEFRAMES.map((timeframe) => factory.riskData?.[timeframe] ?? 0),
});

export function FactoriesTable({ filterString }: { filterString: string }) {
  const [factories, setFactories] = useState<IFactory[]>([]);

  useEffect(() => {
    fetchFactories({ filterString }).then((json) => setFactories(json));
  }, [filterString]);

  return (
    <DataGrid
      className="datagrid"
      rows={factories.map(factoryToRowMapper)}
      columns={columns}
      // density="compact"
    />
  );
}
