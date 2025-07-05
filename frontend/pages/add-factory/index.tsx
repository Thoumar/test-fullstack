import { Box } from '@mui/material';
import { AddFactoryForm } from './AddFactoryForm';

import styles from './index.module.css';

export function AddFactoryPage() {
  return (
    <Box className={styles.page}>
      <AddFactoryForm />
    </Box>
  );
}
