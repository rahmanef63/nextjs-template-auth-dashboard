import { useState, useEffect } from 'react';
import { storage } from '@/utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from storage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = storage.get(key);
    return item !== null ? item : initialValue;
  });

  // Update local storage when state changes
  useEffect(() => {
    storage.set(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}