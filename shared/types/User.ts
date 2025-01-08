export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
  CLIENT = 'CLIENT',
  CUSTOM = 'CUSTOM'
}

import { BaseUser } from 'shared/auth/types';

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  language: string;
  timeZone: string;
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
}

export enum Plan {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export interface UserData {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  plan?: Plan;
}

export interface Team {
  name: string;
}

export interface UserProfile extends BaseUser {
  avatar?: string;
  plan?: string;
  phone?: string;
  memberSince?: string;
  preferences?: {
    language: string;
    timeZone: string;
  };
  language: string;
  timeZone: string;
}

export type ProfileTabType = 'personal' | 'account' | 'preferences';
