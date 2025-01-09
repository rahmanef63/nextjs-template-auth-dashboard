import { jwtVerify, SignJWT } from 'jose';

interface JWTPayload {
  id: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key'
);

export async function generateToken(payload: JWTPayload): Promise<string> {
  const { id, email, role, ...rest } = payload;
  const token = await new SignJWT({ id, email, role, ...rest })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}