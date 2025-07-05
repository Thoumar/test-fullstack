import { IFactory, TIMEFRAMES } from '@climadex/shared';

import { Box, Button } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { useFactories } from 'hooks';

import styles from './FactoriesTable.module.css';

function renderSparklineCell(params: GridRenderCellParams) {
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <Box className={styles.arrayCell}>
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
    </Box>
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
      <Button
        size="small"
        variant="text"
        color="primary"
        href={`/reports/${params.row.id}`}
        style={{ width: '100%' }}
        startIcon={<DescriptionRoundedIcon />}
      >
        Report
      </Button>
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
  const {
    data: factories,
    isLoading,
    isError,
    error,
  } = useFactories(filterString);

  if (isError) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <p>Error loading factories: {error?.message}</p>
      </Box>
    );
  }

  return (
    <DataGrid
      className={styles.factoriesTable}
      rows={factories.map(factoryToRowMapper)}
      columns={columns}
      density="compact"
      loading={isLoading}
      sx={{
        '& .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        '& .MuiDataGrid-columnHeader:focus': {
          outline: 'none',
        },
      }}
      slotProps={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
        },
      }}
    />
  );
}
