import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root.route';

const problemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/problems',
  component: function Problem() {
    return <div className="p-2">Hello from Problems Page!</div>;
  },
});

export default problemRoute;
