import { create } from 'zustand';

export interface ToastData {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastStore {
  toasts: ToastData[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const usePublicToast = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export const publicToast = {
  success: (message: string) => usePublicToast.getState().addToast(message, 'success'),
  error: (message: string) => usePublicToast.getState().addToast(message, 'error'),
  info: (message: string) => usePublicToast.getState().addToast(message, 'info'),
};
