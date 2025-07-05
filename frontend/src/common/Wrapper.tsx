import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';

import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';

import logoUrl from '../assets/logo.png';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Pages',
  },
  {
    segment: 'factories',
    title: 'Factories',
    icon: <FactoryRoundedIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Actions',
  },
  {
    segment: 'add',
    title: 'Add Factory',
    icon: <AddRoundedIcon />,
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export function Wrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  const router = {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path: string | URL) => {
      if (typeof path === 'string') {
        navigate(path);
      } else {
        navigate(path.pathname + path.search);
      }
    },
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={theme}
      branding={{
        logo: <img src={logoUrl} alt="Climadex Logo" />,
        title: 'Climadex',
        homeUrl: '/factories',
      }}
      router={router}
    >
      <DashboardLayout defaultSidebarCollapsed sidebarExpandedWidth={240}>
        <Box sx={{ display: 'flex', overflow: 'hidden' }}>
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
