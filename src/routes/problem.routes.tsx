import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './index.route';

// Layout
import ProblemsLayout from '@/layouts/ProblemsLayout';

// Store
import { useUserStore } from '@/stores/userStore';

// Route Component
import ProblemListingPage from '@/pages/problems/ProblemList';

// Problem Layout Parent
const problemLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ProblemsLayout,
  beforeLoad: ({ location }) => {
    const { isUserLoggedIn } = useUserStore.getState();
    if (!isUserLoggedIn) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

// Problem Layout Child
const problemsIndexRoute = createRoute({
  getParentRoute: () => problemLayoutRoute,
  path: '/problems',
  component: ProblemListingPage,
  beforeLoad: () => {
    const { scopes } = useUserStore.getState();
    if (!scopes.includes('SHEET.R')) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

// Add child routes to Parent route
const problemRoute = problemLayoutRoute.addChildren([problemsIndexRoute]);

export default problemRoute;
