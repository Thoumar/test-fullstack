import React from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  redirect,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Wrapper } from 'common';
import { ReportPage, FactoriesPage, AddFactoryPage } from 'pages';

import './main.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
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
