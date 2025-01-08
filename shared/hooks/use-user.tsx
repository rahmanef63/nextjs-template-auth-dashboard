import { create } from 'zustand';
import { User } from 'shared/types/sidebar';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));