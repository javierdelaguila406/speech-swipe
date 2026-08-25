import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '@/store/toastStore';
const getToastStyles = (type) => {
    const styles = {
        success: {
            bg: 'bg-green-900 bg-opacity-80',
            border: 'border-green-500 border-opacity-50',
            text: 'text-green-300',
            icon: '✓'
        },
        error: {
            bg: 'bg-red-900 bg-opacity-80',
            border: 'border-red-500 border-opacity-50',
            text: 'text-red-300',
            icon: '✕'
        },
        info: {
            bg: 'bg-blue-900 bg-opacity-80',
            border: 'border-blue-500 border-opacity-50',
            text: 'text-blue-300',
            icon: 'ℹ'
        },
        warning: {
            bg: 'bg-yellow-900 bg-opacity-80',
            border: 'border-yellow-500 border-opacity-50',
            text: 'text-yellow-300',
            icon: '⚠'
        }
    };
    return styles[type];
};
export const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();
    return (_jsx("div", { className: "fixed top-4 left-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none", children: _jsx(AnimatePresence, { children: toasts.map((toast) => {
                const styles = getToastStyles(toast.type);
                return (_jsx(motion.div, { initial: { opacity: 0, y: -20, x: 0 }, animate: { opacity: 1, y: 0, x: 0 }, exit: { opacity: 0, y: -20, x: 0 }, transition: { duration: 0.3 }, className: `${styles.bg} ${styles.border} border rounded-lg p-3 backdrop-blur-sm pointer-events-auto`, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("span", { className: `${styles.text} font-bold text-lg flex-shrink-0`, children: styles.icon }), _jsx("div", { className: "flex-1 min-w-0", children: _jsx("p", { className: `${styles.text} text-sm break-words`, children: toast.message }) }), _jsx("button", { onClick: () => removeToast(toast.id), className: `${styles.text} hover:opacity-80 transition-opacity flex-shrink-0 ml-2`, "aria-label": "Cerrar", children: "\u2715" })] }) }, toast.id));
            }) }) }));
};
