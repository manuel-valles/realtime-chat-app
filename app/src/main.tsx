import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import './index.css';
import { client } from './apollo-client';
import { ApolloProvider } from '@apollo/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { MantineProvider } from '@mantine/core';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
