import { type Navigation } from '@toolpad/core/AppProvider';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';

export const navigation: Navigation = [
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
