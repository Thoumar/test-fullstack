import { useCallback, useState, useEffect } from 'react';

import { FactoriesFilters, FactoryFilterValues } from '@climadex/shared';

import { Typography, Grid, TextField, Box, CircularProgress } from '@mui/material';

import styles from './FactoryHeader.module.sass';

export type FactoryHeader = {
  filters: FactoriesFilters;
  onFiltersChange: (filters: FactoriesFilters) => void;
  isLoading?: boolean;
};

export function FactoryHeader({ filters, onFiltersChange, isLoading }: FactoryHeader) {
  const [localFilters, setLocalFilters] = useState<FactoriesFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange(localFilters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localFilters, onFiltersChange]);

  const handleFilterChange = useCallback((key: keyof FactoriesFilters, value: FactoryFilterValues) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value || undefined }));
  }, []);

  return (
    <Box className={styles.header}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="h6">Filters</Typography>
        {isLoading && <CircularProgress size={16} />}
      </Box>
      <Grid container spacing={2}>
        <Grid size={3}>
          <TextField
            size="small"
            fullWidth
            label="Search factories"
            value={localFilters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Factory name..."
          />
        </Grid>
        <Grid size={3}>
          <TextField
            size="small"
            fullWidth
            label="Country"
            value={localFilters.country || ''}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            placeholder="e.g., USA, Germany"
          />
        </Grid>
        <Grid size={3}>
          <TextField
            size="small"
            fullWidth
            label="Min Revenue"
            type="number"
            value={localFilters.minRevenue || ''}
            onChange={(e) => handleFilterChange('minRevenue', e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder="0"
          />
        </Grid>
        <Grid size={3}>
          <TextField
            size="small"
            fullWidth
            label="Max Revenue"
            type="number"
            value={localFilters.maxRevenue || ''}
            onChange={(e) => handleFilterChange('maxRevenue', e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder="999999999"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
