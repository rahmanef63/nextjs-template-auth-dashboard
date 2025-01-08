import { Permission, Role, RoleType } from 'shared/rbac/types';

export interface BaseUser {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  permissions: Permission[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ApiAuthResponse {
  user: BaseUser;
  tokens: AuthTokens;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface AccessLog {
  userId: string;
  resource: string;
  action: string;
  timestamp: number;
  success: boolean;
}
