import { STORAGE_KEYS, DEFAULT_USERS, DEFAULT_NAVIGATION_SETTINGS } from '../config/storage-config';
import type { StorageKey } from '../types/storage-types';

const isBrowser = typeof window !== 'undefined';

export function saveToStorage<T>(key: StorageKey, data: T): void {
  if (!isBrowser) return;
  
  try {
    localStorage.setItem(key.toString(), JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
}

export function getFromStorage<T>(key: StorageKey): T | null {
  if (!isBrowser) return null;
  
  try {
    const item = localStorage.getItem(key.toString());
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from storage:', error);
    return null;
  }
}

export function removeFromStorage(key: StorageKey): void {
  if (!isBrowser) return;
  
  try {
    localStorage.removeItem(key.toString());
  } catch (error) {
    console.error('Error removing from storage:', error);
  }
}

export function updateInStorage<T>(
  key: StorageKey,
  predicate: (item: T) => boolean,
  updater: (item: T) => T
): void {
  if (!isBrowser) return;

  try {
    const items = getFromStorage<T[]>(key);
    if (!items) return;

    const updatedItems = items.map((item) => (predicate(item) ? updater(item) : item));
    saveToStorage(key, updatedItems);
  } catch (error) {
    console.error('Error updating storage:', error);
  }
}

export function initializeStorage(): void {
  if (!getFromStorage(STORAGE_KEYS.USERS)) {
    saveToStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
  }

  if (!getFromStorage(STORAGE_KEYS.NAVIGATION_SETTINGS)) {
    saveToStorage(STORAGE_KEYS.NAVIGATION_SETTINGS, DEFAULT_NAVIGATION_SETTINGS);
  }
}

