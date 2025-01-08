// Constants for storage keys
const STORAGE_KEYS = {
  SESSION: 'rbac_session',
  USERS: 'rbac_users',
  AUDIT_LOGS: 'rbac_audit_logs',
  SETTINGS: 'rbac_settings',
} as const;

// Initialize default data if not exists
function initializeStorage() {
  if (!getFromStorage('USERS')) {
    const defaultUsers = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'AdminPass123!',
        role: 'administrator',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      },
      {
        id: '2',
        name: 'Manager User',
        email: 'manager@example.com',
        password: 'ManagerPass123!',
        role: 'manager',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
      },
      {
        id: '3',
        name: 'Staff User',
        email: 'staff@example.com',
        password: 'StaffPass123!',
        role: 'staff',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      },
      {
        id: '4',
        name: 'Client User',
        email: 'client@example.com',
        password: 'ClientPass123!',
        role: 'guest',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face',
      },
    ];
    saveToStorage('USERS', defaultUsers);
  }
}

export function saveToStorage<T>(key: keyof typeof STORAGE_KEYS, data: T): void {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function getFromStorage<T>(key: keyof typeof STORAGE_KEYS): T | null {
  try {
    const item = localStorage.getItem(STORAGE_KEYS[key]);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

export function removeFromStorage(key: keyof typeof STORAGE_KEYS): void {
  try {
    localStorage.removeItem(STORAGE_KEYS[key]);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

export function appendToStorage<T>(key: keyof typeof STORAGE_KEYS, data: T): void {
  try {
    const existing = getFromStorage<T[]>(key) || [];
    existing.push(data);
    saveToStorage(key, existing);
  } catch (error) {
    console.error('Error appending to localStorage:', error);
  }
}

export function updateInStorage<T>(
  key: keyof typeof STORAGE_KEYS,
  predicate: (item: T) => boolean,
  updater: (item: T) => T
): void {
  try {
    const items = getFromStorage<T[]>(key) || [];
    const updatedItems = items.map((item) => 
      predicate(item) ? updater(item) : item
    );
    saveToStorage(key, updatedItems);
  } catch (error) {
    console.error('Error updating localStorage:', error);
  }
}

// Initialize storage with default data
if (typeof window !== 'undefined') {
  initializeStorage();
}