import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import { useRouter } from 'hooks';
import { branding, navigation, theme } from 'config';

import styles from './Wrapper.module.sass';

export const Wrapper = () => {
  const router = useRouter();

  return (
    <AppProvider navigation={navigation} theme={theme} branding={branding} router={router}>
      <DashboardLayout defaultSidebarCollapsed sidebarExpandedWidth={240}>
        <Box className={styles.container}>
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
};
