import { useState } from 'react';

import { Box } from '@mui/material';

import { Searchbar } from 'components';

import styles from './index.module.css';
import { FactoriesTable } from './FactoriesTable';

export function FactoriesPage() {
  const [filterString, setFilterString] = useState('');

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Searchbar onSearch={setFilterString} />
      </Box>

      <FactoriesTable filterString={filterString} />
    </Box>
  );
}
