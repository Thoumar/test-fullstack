import { Box } from '@mui/material';

import styles from './index.module.css';
import { AddFactoryForm } from './AddFactoryForm';

export function AddFactoryPage() {
  return (
    <Box className={styles.page}>
      <AddFactoryForm />
    </Box>
  );
}
