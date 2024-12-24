export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
  token: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}