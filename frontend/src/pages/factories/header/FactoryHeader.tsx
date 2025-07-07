import { useCallback } from 'react';

import { FactoriesFilters } from '@climadex/shared';

import { Typography, Grid, TextField, Box } from '@mui/material';

import styles from './FactoryHeader.module.sass';

export type FactoryHeader = {
  filters: FactoriesFilters;
  onFiltersChange: (filters: FactoriesFilters) => void;
};

export function FactoryHeader({ filters, onFiltersChange }: FactoryHeader) {
  const handleFilterChange = useCallback(
    (key: keyof FactoriesFilters, value: any) => {
      onFiltersChange({ ...filters, [key]: value || undefined });
    },
    [filters, onFiltersChange]
  );

  return (
    <Box className={styles.header}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Grid container spacing={2}>
        <Grid size={3}>
          <TextField
            size="small"
            fullWidth
            label="Search factories"
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Factory name..."
          />
        </Grid>
        <Grid size={3}>
          <TextField
            size="small"
            fullWidth
            label="Country"
            value={filters.country || ''}
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
            value={filters.minRevenue || ''}
            onChange={(e) =>
              handleFilterChange(
                'minRevenue',
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
            placeholder="0"
          />
        </Grid>
        <Grid size={3}>
          <TextField
            size="small"
            fullWidth
            label="Max Revenue"
            type="number"
            value={filters.maxRevenue || ''}
            onChange={(e) =>
              handleFilterChange(
                'maxRevenue',
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
            placeholder="999999999"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
