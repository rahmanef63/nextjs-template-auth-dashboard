import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../storage/lib';
import { StorageKey } from '../storage/types/storage-types';

export function useLocalStorage<T>(key: StorageKey, initialValue: T) {
  // Get initial value from storage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getFromStorage<T>(key);
    return item ?? initialValue;
  });

  // Update local storage when state changes
  useEffect(() => {
    saveToStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}