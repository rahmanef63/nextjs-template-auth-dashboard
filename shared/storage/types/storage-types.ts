import { STORAGE_KEYS } from '../config/storage-config';
import type { User } from '../../auth/types';
import type { NavigationSettings } from '../../navigation/types/navigation-types';

export type StorageKey = keyof typeof STORAGE_KEYS | (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export interface IStorageService {
  saveToStorage: <T>(key: StorageKey, data: T) => void;
  getFromStorage: <T>(key: StorageKey) => T | null;
  removeFromStorage: (key: StorageKey) => void;
  updateInStorage: <T>(key: StorageKey, data: Partial<T>) => void;
  initializeStorage: () => void;
}

// Re-export needed types
export type { User, NavigationSettings };
