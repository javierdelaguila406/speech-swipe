import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export const Modal = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, onClick: onClose, className: "fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40" }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, transition: { duration: 0.3 }, className: "fixed inset-0 flex items-end z-50", onClick: onClose, children: _jsxs("div", { className: "w-full bg-dark-surface rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [title && _jsx("h2", { className: "text-xl font-bold text-white", children: title }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-white transition-colors", "aria-label": "Cerrar", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), children] }) })] })) }));
};
