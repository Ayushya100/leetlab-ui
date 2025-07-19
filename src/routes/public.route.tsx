import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './index.route';

// Layout
import PublicLayout from '@/layouts/PublicLayout';

// Route Component
import HomePage from '@/pages/public/Home';

// Public Layout Parent
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'root',
  component: PublicLayout,
});

// Public Layout Child
const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: HomePage,
});

// Add Child routes to Parent route
const publicRoutes = publicLayoutRoute.addChildren([homeRoute]);

export default publicRoutes;
