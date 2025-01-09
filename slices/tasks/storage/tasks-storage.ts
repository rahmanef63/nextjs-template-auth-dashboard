import { getFromStorage, saveToStorage } from 'shared/storage/lib/storage-lib';
import { STORAGE_KEYS } from 'shared/storage/config/storage-config';
import { Task } from '../types/task.types';

export class TasksStorage {
  getTasks(): Task[] {
    return getFromStorage<Task[]>(STORAGE_KEYS.TASKS) || [];
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): Task {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const tasks = this.getTasks();
    saveToStorage(STORAGE_KEYS.TASKS, [...tasks, newTask]);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const tasks = this.getTasks();
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
  }

  deleteTask(id: string): void {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    saveToStorage(STORAGE_KEYS.TASKS, filteredTasks);
  }
}