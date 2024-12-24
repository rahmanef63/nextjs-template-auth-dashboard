export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'staff' | 'manager';
  createdAt: Date;
  updatedAt: Date;
}