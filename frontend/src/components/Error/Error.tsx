import { Alert, Box } from '@mui/material';

import styles from './Error.module.sass';

interface ErrorProps {
  text: string;
}

export const Error = ({ text }: ErrorProps) => {
  return (
    <Box className={styles.errorContainer}>
      <Alert severity="error">{text}</Alert>
    </Box>
  );
};
