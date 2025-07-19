import { create } from "zustand";

interface Scope {
  id: string;
  scopeCode: string;
  scopeDesc: string;
  core?: boolean;
  createdDate?: string;
  modifiedDate?: string;
}

interface ScopeStore {
    scopes: Array<Scope>;
    scopeDtl: any | Scope,
    registerUserScopes: (userScopes: Array<Scope>) => void;
    clearUserScopes: () => void;
    registerUserScopeDtl: (userScopeDtl: Scope) => void;
    clearUserScopeDtl: () => void;
}

export const useScopeStore = create<ScopeStore>()((set) => ({
    scopes: [],
    scopeDtl: {},

    registerUserScopes: (userScopes: Array<Scope>) => set({ scopes: userScopes }),
    clearUserScopes: () => set({ scopes: [] }),
    registerUserScopeDtl: (userScopeDtl: Scope) => set({ scopeDtl: userScopeDtl }),
    clearUserScopeDtl: () => set({ scopeDtl: {} })
}));
