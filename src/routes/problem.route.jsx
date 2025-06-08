import { createRoute, redirect, Route } from '@tanstack/react-router';
import { rootRoute } from './__root.route';
import { UserAppComponent } from '../modules/private-ui/UserAppPage';
import { ProblemListingComponent } from '../modules/problems-ui/listing-component/Listing';
import { useUserStore } from '../store/userStore';

const problemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/problems',
  component: UserAppComponent,
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

const problemsIndexRoute = createRoute({
  getParentRoute: () => problemRoute,
  path: '/',
  component: ProblemListingComponent,
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

problemRoute.addChildren([problemsIndexRoute]);

export default problemRoute;
