import { create } from 'zustand';

interface Role {
  id: string;
  roleCode: string;
  roleDesc: string;
  active: boolean;
  default: boolean;
  core?: boolean;
  createdDate?: string;
  modifiedDate?: string;
}

interface Scope {
  id: string;
  scopeCode: string;
  scopeDesc: string;
}

interface RoleStore {
  roles: Array<Role>;
  roleDtl: any | Role;
  roleScopes: Array<Scope>;
  unassignedScopes: Array<Scope>;
  registerUserRoles: (userScopes: Array<Role>) => void;
  clearUserRoles: () => void;
  registerUserRoleDtl: (userScopesDtl: Role) => void;
  clearUserRoleDtl: () => void;
  registerUserRoleScope: (roleScopes: Array<Scope>) => void;
  clearUserRoleScope: () => void;
  registerUnassignedScopes: (unassignedScopes: Array<Scope>) => void;
  clearUnassignedScopes: () => void;
}

export const useRoleStore = create<RoleStore>()((set) => ({
  roles: [],
  roleDtl: {},
  roleScopes: [],
  unassignedScopes: [],

  registerUserRoles: (userRoles: Array<Role>) => set({ roles: userRoles }),
  clearUserRoles: () => set({ roles: [] }),
  registerUserRoleDtl: (userRoleDtl: Role) => set({ roleDtl: userRoleDtl }),
  clearUserRoleDtl: () => set({ roleDtl: [] }),
  registerUserRoleScope: (userRoleScope: Array<Scope>) => set({ roleScopes: userRoleScope }),
  clearUserRoleScope: () => set({ roleScopes: [] }),
  registerUnassignedScopes: (userScope: Array<Scope>) => set({ unassignedScopes: userScope }),
  clearUnassignedScopes: () => set({ unassignedScopes: [] }),
}));
