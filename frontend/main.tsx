import * as ReactDOM from 'react-dom/client';

import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FactoriesPage } from './pages/factories';
import { Wrapper } from './common/Wrapper';

import './main.css';
import { AddFactoryPage } from './pages/add-factory';
import { ReportPage } from './pages/report';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
