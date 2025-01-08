import { getServerSession } from 'next-auth';
import { authConfig } from 'shared/config/auth';
import { Session } from '../types';

export async function getSession() {
  return await getServerSession(authConfig) as Session | null;
}

export function getSessionSync() {
  return currentSession;
}

let currentSession: Session | null = null;

export function setSession(session: Session | null) {
  currentSession = session;
}

export function clearSession() {
  currentSession = null;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}