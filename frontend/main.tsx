import * as ReactDOM from 'react-dom/client';

import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { FactoriesPage } from './pages/factories';
import { Wrapper } from './common/Wrapper';

import './main.css';
import { AddFactoryPage } from './pages/add-factory';
import { ReportPage } from './pages/report';

const router = createBrowserRouter([
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
