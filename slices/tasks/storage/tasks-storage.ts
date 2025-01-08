import { StorageManager } from 'shared/storage/utils/storage-manager';
import { STORAGE_KEYS } from 'shared/storage/constants/storage.constants';
import { Task } from '../types/task.types';

export class TasksStorage {
  private storage: StorageManager;

  constructor() {
    this.storage = new StorageManager();
  }

  getTasks(): Task[] {
    return this.storage.get<Task[]>(STORAGE_KEYS.tasks) || [];
  }

  addTask(task: Omit<Task, 'id'>): Task {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this.storage.update<Task[]>(STORAGE_KEYS.tasks, (tasks = []) => [...tasks, newTask]);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): void {
    this.storage.update<Task[]>(STORAGE_KEYS.tasks, (tasks = []) =>
      tasks.map(task => task.id === id ? { ...task, ...updates } : task)
    );
  }

  deleteTask(id: string): void {
    this.storage.update<Task[]>(STORAGE_KEYS.tasks, (tasks = []) =>
      tasks.filter(task => task.id !== id)
    );
  }
}