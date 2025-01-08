export { AuthProvider, type AuthContextType } from './context/auth-context';
export { useAuth } from './hooks/use-auth';
export { AuthGuard } from './guards/auth-guard';

// Re-export types
export type {
  AuthUser,
  AuthState,
  AuthTokens,
  AuthResponse,
  LoginResponse,
  RegisterResponse,
  AuthFormData,
  Role,
  Session,
  AccessLog
} from './types';
