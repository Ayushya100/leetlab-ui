import { create } from 'zustand';

interface Route {
  id: string;
  path: string;
  method: string;
  service: string;
}

interface Service {
  id: string;
  microservice: string;
}

interface RouteStore {
  routes: Array<Route>;
  routeDtl: Route | any;
  services: Array<Service>;
  registerRoutes: (routes: Array<Route>) => void;
  clearRoutes: () => void;
  registerRouteDtl: (routeDtl: Route) => void;
  clearRouteDtl: () => void;
  registerServices: (services: Array<Service>) => void;
  clearServices: () => void;
}

export const useRouteStore = create<RouteStore>()((set) => ({
  routes: [],
  routeDtl: {},
  services: [],

  registerRoutes: (routes: Array<Route>) => set({ routes: routes }),
  clearRoutes: () => set({ routes: [] }),
  registerRouteDtl: (routeDtl: Route) => set({ routeDtl: routeDtl }),
  clearRouteDtl: () => set({ routeDtl: {} }),
  registerServices: (services: Array<Service>) => set({ services: services }),
  clearServices: () => set({ services: [] }),
}));
