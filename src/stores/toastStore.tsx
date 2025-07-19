import { create } from 'zustand';

type ToastType = 'success' | 'error';

interface ToastState {
  message: string;
  resStatus: string;
  type: ToastType;
  isOpen: boolean;
  showToast: (message: string, resStatus: string, type?: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  resStatus: '',
  type: 'success',
  isOpen: false,
  showToast: (message, resStatus, type = 'success') => {
    set({ message, resStatus, type, isOpen: true });
    setTimeout(() => set({ isOpen: false }), 3000);
  },
  hideToast: () => set({ isOpen: false }),
}));
