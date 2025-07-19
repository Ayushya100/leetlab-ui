import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './index.route';
import ProblemsLayout from '@/layouts/ProblemsLayout';

// Store
import { useUserStore } from '@/stores/userStore';

// Route Component
import RolesPage from '@/pages/roles/Roles';
import RoleDetailPage from '@/pages/roles/RoleDetail';

// Configuration Layout Parent
const configurationLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/setting',
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

// Configuration Layout Child
const userRoleRoute = createRoute({
  getParentRoute: () => configurationLayoutRoute,
  path: '/role',
  component: RolesPage,
  beforeLoad: () => {
    const { scopes } = useUserStore.getState();
    if (!scopes.includes('ROLE.V')) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

const userRoleDetailRoute = createRoute({
  getParentRoute: () => configurationLayoutRoute,
  path: '/role/$id',
  component: RoleDetailPage,
  beforeLoad: () => {
    const { scopes } = useUserStore.getState();
    if (!scopes.includes('ROLE.U')) {
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
const configurationRoute = configurationLayoutRoute.addChildren([userRoleRoute, userRoleDetailRoute]);

export default configurationRoute;
