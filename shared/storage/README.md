# Storage Module (`/shared/storage`)

## Overview
The storage module provides a robust, type-safe interface for managing client-side storage in Next.js applications. It handles localStorage and sessionStorage with features like encryption, persistence, cross-tab synchronization, and automatic type inference.

## Directory Structure and File Descriptions

### Root Files
- `index.ts` - Main entry point exporting public storage APIs

### `/config`
Storage configuration:
- `storage-config.ts` - Storage configuration and encryption settings
- `index.ts` - Configuration exports

### `/constants`
Storage constants:
- `roles-storage-constants.ts` - Role-specific storage constants
- `index.ts` - Constants exports

### `/hooks`
React hooks:
- `useStorage.ts` - Custom hook for type-safe storage operations
- `index.ts` - Hook exports

### `/lib`
Core storage utilities:
- `navigation-storage.ts` - Navigation state persistence
- `roles-storage.ts` - Role and permission storage
- `storage-lib.ts` - Core storage implementation
- `index.ts` - Library exports

### `/types`
TypeScript definitions:
- `storage-types.ts` - Storage type definitions
- `index.ts` - Type exports

## Usage Examples

1. **Basic Storage Operations**
```typescript
import { useStorage } from '@/shared/storage/hooks'

function UserPreferences() {
  const { getValue, setValue, removeValue } = useStorage()
  
  // Type-safe storage operations
  const theme = getValue('theme', 'light') // default value is 'light'
  const setTheme = (newTheme: 'light' | 'dark') => {
    setValue('theme', newTheme)
  }
  
  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}
```

2. **Encrypted Storage**
```typescript
import { useStorage } from '@/shared/storage/hooks'

function SecureStorage() {
  const { setEncrypted, getEncrypted } = useStorage()
  
  // Store sensitive data with encryption
  const storeApiKey = (apiKey: string) => {
    setEncrypted('api-key', apiKey, {
      expiresIn: '7d'
    })
  }
  
  // Retrieve encrypted data
  const apiKey = getEncrypted('api-key')
}
```

3. **Cross-Tab Synchronization**
```typescript
import { useStorage } from '@/shared/storage/hooks'

function SyncedComponent() {
  const { getValue, setValue, subscribe } = useStorage()
  const [data, setData] = useState(getValue('shared-data'))
  
  useEffect(() => {
    // Subscribe to storage changes from other tabs
    const unsubscribe = subscribe('shared-data', (newValue) => {
      setData(newValue)
    })
    
    return () => unsubscribe()
  }, [])
}
```

## Features

1. **Storage Management**
   - Type-safe storage operations
   - Automatic serialization/deserialization
   - Default value support
   - Storage event handling
   - Quota management
   - Error recovery
   - Storage migration

2. **Security Features**
   - AES-256 encryption support
   - Secure key generation
   - Data sanitization
   - XSS prevention
   - CSRF protection
   - Sensitive data handling
   - Secure deletion

3. **State Synchronization**
   - Cross-tab communication
   - Real-time updates
   - State persistence
   - Conflict resolution
   - Offline support
   - State recovery
   - Change tracking

4. **Performance**
   - Efficient serialization
   - Compression support
   - Batch operations
   - Lazy loading
   - Cache management
   - Storage optimization
   - Memory usage control

## Configuration

```typescript
import { StorageConfig } from '@/shared/storage/types'

const storageConfig: StorageConfig = {
  prefix: 'app_',
  encryption: {
    enabled: true,
    algorithm: 'AES-256-GCM',
    secretKey: process.env.STORAGE_SECRET_KEY
  },
  persistence: {
    enabled: true,
    strategy: 'localStorage',
    fallback: 'sessionStorage'
  },
  quotaManagement: {
    maxSize: '5MB',
    cleanup: 'LRU'
  },
  sync: {
    enabled: true,
    debounce: 100
  }
}
```

## Best Practices

1. **Data Security**
   - Use encryption for sensitive data
   - Implement proper key management
   - Regular security audits
   - Sanitize stored data
   - Handle data exposure
   - Secure data transmission
   - Privacy compliance

2. **Performance Optimization**
   - Minimize storage operations
   - Implement caching strategies
   - Use batch operations
   - Compress large data
   - Monitor storage usage
   - Optimize serialization
   - Handle quota limits

3. **Error Handling**
   - Implement fallback mechanisms
   - Handle storage unavailability
   - Recover from corruption
   - Validate stored data
   - Log storage errors
   - Provide user feedback
   - Maintain data integrity

4. **Type Safety**
   - Use TypeScript generics
   - Implement schema validation
   - Version stored data
   - Handle migrations
   - Type guard utilities
   - Runtime type checking
   - Schema evolution

## Contributing

When extending the storage system:

1. Follow TypeScript strict mode
2. Add comprehensive tests
3. Document security implications
4. Consider browser compatibility
5. Implement error handling
6. Add migration support
7. Update type definitions
8. Maintain backward compatibility

## Common Patterns

1. **Versioned Storage**
```typescript
import { useStorage } from '@/shared/storage/hooks'

function VersionedStorage() {
  const { getValue, setValue } = useStorage()
  
  const migrateData = (oldData: any) => {
    // Migration logic
    return newData
  }
  
  // Get data with version check
  const data = getValue('user-data', null, {
    version: 2,
    migrate: migrateData
  })
}
```

2. **Storage with Validation**
```typescript
import { useStorage } from '@/shared/storage/hooks'
import { z } from 'zod'

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email()
})

function ValidatedStorage() {
  const { getValue, setValue } = useStorage()
  
  // Store with validation
  const storeUser = (user: z.infer<typeof userSchema>) => {
    const result = userSchema.safeParse(user)
    if (result.success) {
      setValue('user', result.data)
    }
  }
}
