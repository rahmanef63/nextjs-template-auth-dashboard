import { getServerSession } from 'next-auth';
import { authConfig } from 'shared/config/auth';

export async function getSession() {
  return await getServerSession(authConfig);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}