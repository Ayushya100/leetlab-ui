import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist((set) => ({
    isUserLoggedIn: false,
    scopes: [],

    addUserScope: (userScopes) => set({ scopes: userScopes }),
    clearScope: () => set({ scopes: [] }),

    registerUserLogin: (userLoggedIn) => set({ isUserLoggedIn: userLoggedIn }),
    removeUserLogin: () => set({ isUserLoggedIn: false }),
  }))
);
