import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root.route';
import HomePage from '../modules/public-ui/home/homePage';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

export default indexRoute;
