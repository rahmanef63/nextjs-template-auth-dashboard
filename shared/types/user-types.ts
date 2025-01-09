import { BaseUser } from 'shared/auth/types';
import { RoleType as Role } from '../permission/types';

export { Role };

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

export interface UserData extends BaseUser {
  avatar?: string;
  plan?: Plan;
}

export interface Team {
  name: string;
}

export interface UserProfile extends UserData {
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
