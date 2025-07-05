import { Outlet } from 'react-router-dom';

import styles from './Container.module.css';
import { Box } from '@mui/material';

export function Container() {
  return (
    <Box className={styles.container}>
      <Outlet />
    </Box>
  );
}
