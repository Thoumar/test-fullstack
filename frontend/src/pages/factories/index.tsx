import { Box } from '@mui/material';

import { FactoriesTable } from './table/FactoriesTable';

import styles from './index.module.sass';

export function FactoriesPage() {
  return (
    <Box className={styles.page}>
      <FactoriesTable />
    </Box>
  );
}
