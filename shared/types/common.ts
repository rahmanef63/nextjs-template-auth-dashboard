// Base types that are shared across the application

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: string | number | boolean | null;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}
