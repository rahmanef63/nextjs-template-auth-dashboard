import { StorageManager } from 'shared/storage/utils/storage-manager';
import { STORAGE_KEYS } from 'shared/storage/constants/storage.constants';
import { Document } from '../types/document.types';

export class DocumentsStorage {
  private storage: StorageManager;

  constructor() {
    this.storage = new StorageManager();
  }

  getDocuments(): Document[] {
    return this.storage.get<Document[]>(STORAGE_KEYS.documents) || [];
  }

  addDocument(document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Document {
    const newDocument: Document = {
      ...document,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.storage.update<Document[]>(
      STORAGE_KEYS.documents,
      (docs = []) => [...docs, newDocument]
    );
    return newDocument;
  }

  updateDocument(id: string, updates: Partial<Document>): void {
    this.storage.update<Document[]>(
      STORAGE_KEYS.documents,
      (docs = []) => docs.map(doc => 
        doc.id === id 
          ? { ...doc, ...updates, updatedAt: new Date().toISOString() }
          : doc
      )
    );
  }

  deleteDocument(id: string): void {
    this.storage.update<Document[]>(
      STORAGE_KEYS.documents,
      (docs = []) => docs.filter(doc => doc.id !== id)
    );
  }
}