import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root.route';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});

export default indexRoute;
