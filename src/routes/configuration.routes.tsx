import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './index.route';

// Layout
import ProblemsLayout from '@/layouts/ProblemsLayout';

// Store
import { useUserStore } from '@/stores/userStore';

// Route Component
import RolesPage from '@/pages/roles/Roles';
import RoleDetailPage from '@/pages/roles/RoleDetail';
import ScopesPage from '@/pages/scopes/Scopes';
import ScopeDetailPage from '@/pages/scopes/ScopeDetail';
import ServicesPage from '@/pages/services/Services';
import ServiceDetailPage from '@/pages/services/ServiceDetail';
import RoutesPage from '@/pages/routes/Routes';
import RouteDetailPage from '@/pages/routes/RouteDetail';

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

const userScopeRoute = createRoute({
  getParentRoute: () => configurationLayoutRoute,
  path: '/scope',
  component: ScopesPage,
  beforeLoad: () => {
    const { scopes } = useUserStore.getState();
    if (!scopes.includes('SCOPE.V')) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

const userScopeDetailRoute = createRoute({
  getParentRoute: () => configurationLayoutRoute,
  path: '/scope/$id',
  component: ScopeDetailPage,
  beforeLoad: () => {
    const { scopes } = useUserStore.getState();
    if (!scopes.includes('SCOPE.V')) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

const serviceRoute = createRoute({
  getParentRoute: () => configurationLayoutRoute,
  path: '/service',
  component: ServicesPage,
  beforeLoad: () => {
    const { scopes } = useUserStore.getState();
    if (!scopes.includes('SERVICE.V')) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

const serviceDetailRoute = createRoute({
  getParentRoute: () => configurationLayoutRoute,
  path: '/service/$id',
  component: ServiceDetailPage,
  beforeLoad: () => {
    const { scopes } = useUserStore.getState();
    if (!scopes.includes('SERVICE.V')) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

const routesRoute = createRoute({
  getParentRoute: () => configurationLayoutRoute,
  path: '/route',
  component: RoutesPage,
  beforeLoad: () => {
    const { scopes } = useUserStore.getState();
    if (!scopes.includes('ROUTE.V')) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

const routeDetailRoute = createRoute({
  getParentRoute: () => configurationLayoutRoute,
  path: '/route/$id',
  component: RouteDetailPage,
  beforeLoad: () => {
    const { scopes } = useUserStore.getState();
    if (!scopes.includes('ROUTE.V')) {
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
const configurationRoute = configurationLayoutRoute.addChildren([
  userRoleRoute,
  userRoleDetailRoute,
  userScopeRoute,
  userScopeDetailRoute,
  serviceRoute,
  serviceDetailRoute,
  routesRoute,
  routeDetailRoute,
]);

export default configurationRoute;
