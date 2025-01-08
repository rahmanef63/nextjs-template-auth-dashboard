import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../lib/storage-lib';
import type { StorageKey } from '../types/storage-types';

export function useStorage<T>(key: StorageKey, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getFromStorage<T>(key);
    return item !== null ? item : initialValue;
  });

  useEffect(() => {
    saveToStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
