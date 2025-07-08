import { useCallback } from 'react';

import { Factory } from '@climadex/shared';

import { Box, Button, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

import { RiskBadge } from 'components';

import styles from './../pages/factories/table/FactoriesTable.module.sass';

export const useDatagrid = () => {
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
        if (!params.row.riskClassification || !params.row.temperatureIncrease2090 || !params.row.worstTimeframe) {
          return (
            <Box className={styles.noDataCell}>
              <Typography variant="body2">No Data</Typography>
            </Box>
          );
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

  const handlePageChange = useCallback((_: unknown, page: number) => {
    return page;
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    return { page: 1, limit: newPageSize };
  }, []);

  return {
    columns,
    factoryToRowMapper,
    handlePageChange,
    handlePageSizeChange,
  };
};
