import { useState, useCallback } from 'react';
import { TasksStorage } from '../storage/tasks-storage';
import { Task } from '../types/task.types';

export function useTasks() {
  const storage = new TasksStorage();
  const [tasks, setTasks] = useState<Task[]>(() => storage.getTasks());

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask = storage.addTask(task);
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    storage.updateTask(id, updates);
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    storage.deleteTask(id);
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
}