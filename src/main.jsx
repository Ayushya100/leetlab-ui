import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { rootRoute } from './routes/__root.route.jsx';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import indexRoute from './routes/index.route.jsx';
import aboutRoute from './routes/about.route.jsx';

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({ routeTree });

const rootElement = document.getElementById('root');
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
