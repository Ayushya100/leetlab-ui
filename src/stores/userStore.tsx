import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  isUserLoggedIn: boolean;
  scopes: Array<any>;
  addUserScope: (userScopes: Array<any>) => void;
  clearScope: () => void;
  registerUserLogin: (userLoggedIn: boolean) => void;
  removeUserLogin: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isUserLoggedIn: false,
      scopes: [],

      addUserScope: (userScopes: any) => set({ scopes: userScopes }),
      clearScope: () => set({ scopes: [] }),

      registerUserLogin: (userLoggedIn: any) => set({ isUserLoggedIn: userLoggedIn }),
      removeUserLogin: () => set({ isUserLoggedIn: false }),
    }),
    {
      name: 'user-store',
    }
  )
);
