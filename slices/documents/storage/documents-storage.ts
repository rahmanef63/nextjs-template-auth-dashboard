import { saveToStorage, getFromStorage, removeFromStorage } from 'shared/storage/lib/storage-lib';
import { STORAGE_KEYS } from 'shared/storage/config/storage-config';
import { Document } from '../types/document.types';

export class DocumentsStorage {
  constructor() {}

  getDocuments(): Document[] {
    return getFromStorage<Document[]>(STORAGE_KEYS.DOCUMENTS) || [];
  }

  addDocument(document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Document {
    const newDocument: Document = {
      ...document,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const documents = this.getDocuments();
    saveToStorage(STORAGE_KEYS.DOCUMENTS, [...documents, newDocument]);
    return newDocument;
  }

  updateDocument(id: string, updates: Partial<Omit<Document, 'id' | 'createdAt' | 'updatedAt'>>): void {
    const documents = this.getDocuments();
    const updatedDocuments = documents.map(doc =>
      doc.id === id
        ? { ...doc, ...updates, updatedAt: new Date().toISOString() }
        : doc
    );
    saveToStorage(STORAGE_KEYS.DOCUMENTS, updatedDocuments);
  }

  deleteDocument(id: string): void {
    const documents = this.getDocuments();
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    saveToStorage(STORAGE_KEYS.DOCUMENTS, updatedDocuments);
  }
}