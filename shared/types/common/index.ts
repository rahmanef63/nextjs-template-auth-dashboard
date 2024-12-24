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
  details?: Record<string, any>;
}