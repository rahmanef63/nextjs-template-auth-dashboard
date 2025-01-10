import { User } from '@/shared/auth/types';
import { RoleType } from '@/shared/permission/types';

export { RoleType as Role };

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

export type UserData = User;

export interface Team {
  name: string;
}

export interface UserProfile extends User {
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
