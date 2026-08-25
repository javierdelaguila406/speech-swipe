import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const ActionButton = ({ icon, label, color, isActive = false, disabled = false, onClick, ariaLabel }) => {
    return (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(motion.button, { whileHover: { scale: disabled ? 1 : 1.05 }, whileTap: { scale: disabled ? 1 : 0.95 }, animate: isActive ? { scale: [1, 1.1, 1] } : {}, transition: isActive ? { duration: 0.6, repeat: Infinity } : {}, onClick: onClick, disabled: disabled, className: "w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed", style: {
                    backgroundColor: color,
                    opacity: disabled ? 0.5 : 1
                }, "aria-label": ariaLabel || label, title: ariaLabel || label, children: _jsx("div", { className: "text-3xl flex items-center justify-center", children: icon }) }), _jsx("span", { className: "text-xs font-semibold text-gray-300 text-center w-16", children: label })] }));
};
