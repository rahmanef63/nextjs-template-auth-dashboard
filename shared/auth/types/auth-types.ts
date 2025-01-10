import { Role, RoleType } from '@/shared/permission/types/rbac-types';

// Base user properties
export interface BaseUser {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string;
  role: Role;
  roleType: RoleType;
}

// The main User type that other modules should extend
export interface User extends BaseUser {
  plan?: Plan;
  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  name: string;
  price: number;
  features: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ApiAuthResponse {
  user: User;
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
