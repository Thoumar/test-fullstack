import { useState, useCallback } from 'react';

import {
  FactoriesFilters,
  FactoriesPagination,
  Factory,
  TIMEFRAMES,
} from '@climadex/shared';

import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Pagination,
  Stack,
} from '@mui/material';

import { useFactories } from 'hooks';
import { RiskBadge } from 'components';

import { FactoryHeader } from '../header/FactoryHeader';

import styles from './FactoriesTable.module.sass';

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
    field: 'riskClassification',
    headerName: 'Climate Risk',
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      if (
        !params.row.riskClassification ||
        !params.row.temperatureIncrease2090 ||
        !params.row.worstTimeframe
      ) {
        return <Typography variant="body2">No Data</Typography>;
      }
      return (
        <RiskBadge
          riskLevel={params.row.riskClassification}
          temperatureIncrease={params.row.temperatureIncrease2090}
          worstTimeframe={params.row.worstTimeframe}
        />
      );
    },
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

const factoryToRowMapper = (factory: Factory) => ({
  id: factory.id,
  name: factory.name,
  address: factory.address,
  country: factory.country,
  latitude: factory.latitude,
  longitude: factory.longitude,
  yearlyRevenue: factory.yearlyRevenue,
  riskClassification: factory.riskClassification,
  temperatureIncrease2090: factory.temperatureIncrease2090,
  worstTimeframe: factory.worstTimeframe,
});

export function FactoriesTable() {
  const [filters, setFilters] = useState<FactoriesFilters>({});
  const [pagination, setPagination] = useState<FactoriesPagination>({
    page: 1,
    limit: 20,
  });

  const {
    factories,
    pagination: paginationInfo,
    isLoading,
    isError,
    error,
  } = useFactories({ filters, pagination });

  const handlePageChange = useCallback(
    (_e: React.ChangeEvent<unknown> | null, page: number) => {
      setPagination((prev) => ({ ...prev, page }));
    },
    []
  );

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination({ page: 1, limit: newPageSize });
  }, []);

  if (isError) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">
          Error loading factories: {error?.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <FactoryHeader filters={filters} onFiltersChange={setFilters} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">
          Factories ({paginationInfo.total} total)
        </Typography>
        <FormControl size="small">
          <InputLabel>Per page</InputLabel>
          <Select
            value={pagination.limit}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            label="Per page"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        className={styles.factoriesTable}
        rows={factories.map(factoryToRowMapper)}
        columns={columns}
        density="compact"
        loading={isLoading}
        hideFooter
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        }}
      />

      {paginationInfo.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={paginationInfo.totalPages}
            page={paginationInfo.page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}
