import { Box } from '@mui/material';

import { AddFactoryForm } from './form/AddFactoryForm';

import styles from './index.module.sass';

export function AddFactoryPage() {
  return (
    <Box className={styles.page}>
      <AddFactoryForm />
    </Box>
  );
}
