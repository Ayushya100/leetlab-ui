import { create } from 'zustand';

interface Service {
  id: string;
  microservice: string;
  environment: string;
  protocol: string;
  port: string;
}

interface ServiceStore {
  services: Array<Service>;
  serviceDtl: any | Service;
  registerServices: (services: Array<Service>) => void;
  clearServices: () => void;
  registerServiceDtl: (serviceDtl: Service) => void;
  clearServiceDtl: () => void;
}

export const useServiceStore = create<ServiceStore>()((set) => ({
  services: [],
  serviceDtl: {},

  registerServices: (services: Array<Service>) => set({ services: services }),
  clearServices: () => set({ services: [] }),
  registerServiceDtl: (serviceDtl: Service) => set({ serviceDtl: serviceDtl }),
  clearServiceDtl: () => set({ serviceDtl: {} }),
}));
