import { useState } from 'react';

import { FactoriesFilters } from '@climadex/shared';

import { Box } from '@mui/material';

import { FactoryHeader } from './header/FactoryHeader';
import { FactoriesTable } from './table/FactoriesTable';

import styles from './index.module.sass';

export function FactoriesPage() {
  const [filters, setFilters] = useState<FactoriesFilters>({});

  return (
    <Box className={styles.page}>
      <FactoryHeader filters={filters} onFiltersChange={setFilters} />
      <FactoriesTable filters={filters} />
    </Box>
  );
}
