import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const TopBar = ({ current, total, isFavorite, onFavoriteToggle }) => {
    return (_jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-white border-opacity-5", children: [_jsxs("span", { className: "text-sm text-gray-400", children: [current + 1, " / ", total] }), _jsx(motion.button, { onClick: onFavoriteToggle, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "text-2xl transition-colors", "aria-label": isFavorite ? 'Quitar de favoritas' : 'Agregar a favoritas', children: isFavorite ? '★' : '☆' })] }));
};
