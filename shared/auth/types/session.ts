import { RoleType } from '@/shared/permission/types/rbac-types';

export interface SessionUser {
  id: string;
  name: string | null;
  email: string;
  role: {
    id: string;
    name: string;
    type: RoleType;
  };
  permissions: string[];
}

export interface Session {
  user: SessionUser;
  expires: string;
}

export type { Session as DefaultSession } from 'next-auth';

let currentSession: Session | null = null;

export function setSession(session: Session | null) {
  currentSession = session;
}

export function getSession(): Session | null {
  return currentSession;
}

export function clearSession() {
  currentSession = null;
}