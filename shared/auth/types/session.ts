import { BaseUser } from './auth-types';

export interface Session {
  user: BaseUser & {
    image?: string | null;
  };
  expires: string;
}

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