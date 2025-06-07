import { create } from 'zustand';

export const useUserStore = create((set) => ({
    isUserLoggedIn: false,
    scopes: [],
    
    addUserScope: (userScopes) => set({scopes: userScopes}),
    clearScope: () => set({scopes: []}),

    registerUserLogin: (userLoggedIn) => set({isUserLoggedIn: userLoggedIn}),
    removeUserLogin: () => set({isUserLoggedIn: false})
}));
