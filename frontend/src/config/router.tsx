import { createBrowserRouter, redirect } from 'react-router-dom';

import { Wrapper } from 'common';
import { FactoriesPage, AddFactoryPage, ReportPage } from 'pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        path: '',
        loader: () => redirect('/factories'),
      },
      {
        path: 'factories',
        element: <FactoriesPage />,
      },
      {
        path: 'add',
        element: <AddFactoryPage />,
      },
      {
        path: 'reports/:reportId',
        element: <ReportPage />,
      },
      {
        path: '*',
        element: <p>Not found.</p>,
      },
    ],
    errorElement: <p>An error has occurred.</p>,
  },
]);
