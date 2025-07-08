import { Box, CircularProgress, Typography } from '@mui/material';

import styles from './Loading.module.sass';

interface LoaadingProps {
  text: string;
}

export const Loading = ({ text }: LoaadingProps) => {
  return (
    <Box className={styles.loadingContainer}>
      <Box className={styles.loadingContent}>
        <CircularProgress />
        <Typography variant="h6">{text}</Typography>
      </Box>
    </Box>
  );
};
