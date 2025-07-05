import { useState } from 'react';
import { FactoriesTable } from './FactoriesTable';

import styles from './index.module.css';
import { Searchbar } from '../../components/Searchbar';
import { Box } from '@mui/material';

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
