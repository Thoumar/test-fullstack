import { useState, useCallback } from 'react';

import { FactoriesFilters, FactoriesPagination } from '@climadex/shared';

import { DataGrid } from '@mui/x-data-grid';
import { Box, MenuItem, Select, FormControl, InputLabel, Typography, Pagination } from '@mui/material';

import { useDatagrid, useFactories } from 'hooks';

import styles from './FactoriesTable.module.sass';

interface FactoriesTableProps {
  filters: FactoriesFilters;
}

export function FactoriesTable({ filters }: FactoriesTableProps) {
  const { columns, factoryToRowMapper } = useDatagrid();
  const [pagination, setPagination] = useState<FactoriesPagination>({
    page: 1,
    limit: 20,
  });

  const { factories, pagination: paginationInfo, isLoading, isError, error } = useFactories({ filters, pagination });

  const handlePageChange = useCallback((_: unknown, page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination({ page: 1, limit: newPageSize });
  }, []);

  if (isError) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">Error loading factories: {error?.message}</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h6">Factories ({paginationInfo.total} total)</Typography>
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
        <Box className={styles.pagination}>
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
