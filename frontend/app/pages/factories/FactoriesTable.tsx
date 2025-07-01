import { useEffect, useState } from 'react';

import './FactoriesTable.css';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { IFactory } from '@climadex/types';
import { FactoryRow } from './FactoryRow';

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
  { field: 'name', headerName: 'Factory name', width: 200 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'country', headerName: 'Country', width: 150 },
  { field: 'latitude', headerName: 'Latitude', width: 150 },
  { field: 'longitude', headerName: 'Longitude', width: 150 },
  {
    field: 'yearlyRevenue',
    headerName: 'Yearly Revenue',
    type: 'number',
    width: 180,
  },
];

export function FactoriesTable({ filterString }: { filterString: string }) {
  const [factories, setFactories] = useState<IFactory[]>([]);
  const showDatagrid = true;

  useEffect(() => {
    fetchFactories({ filterString }).then((json) => setFactories(json));
  }, [filterString]);

  if (showDatagrid) return <DataGrid rows={factories} columns={columns} />;

  return (
    <table>
      <thead>
        <tr>
          <th>Factory name</th>
          <th>Address</th>
          <th>Country</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Yearly Revenue</th>
        </tr>
      </thead>
      <tbody>{factories?.map(FactoryRow)}</tbody>
    </table>
  );
}
