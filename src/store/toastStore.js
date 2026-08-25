import { create } from 'zustand';
export const useToastStore = create((set) => ({
    toasts: [],
    addToast: (message, type, duration = 3000) => {
        const id = crypto.randomUUID();
        set((state) => ({
            toasts: [...state.toasts, { id, message, type, duration }]
        }));
        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t) => t.id !== id)
                }));
            }, duration);
        }
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id)
        }));
    },
    clearAll: () => {
        set({ toasts: [] });
    }
}));
