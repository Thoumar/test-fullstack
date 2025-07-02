import { useEffect, useState } from 'react';

import './FactoriesTable.css';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { IFactory, TIMEFRAMES } from '@climadex/types';
import Chip from '@mui/material/Chip';

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

const RiskLevelCell = ({ params }: { params: GridRenderCellParams }) => {
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

export default RiskLevelCell;
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
