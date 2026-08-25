import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Badge } from '@/components/common/Badge';
export const PhraseCard = ({ phrase, isActive }) => {
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -40 }, transition: { duration: 0.3 }, className: "relative bg-dark-surface rounded-3xl overflow-hidden shadow-lg", style: {
            aspectRatio: '16 / 10',
        }, children: [_jsx("img", { src: phrase.image.url, alt: phrase.image.alt, className: "w-full h-full object-cover", onError: (e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/343x215?text=Sin+imagen';
                } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" }), _jsxs("div", { className: "absolute inset-0 flex flex-col justify-between p-4", children: [_jsx("div", { className: "flex justify-start", children: _jsx(Badge, { text: phrase.category }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-4xl font-bold text-white leading-tight drop-shadow-lg", children: phrase.text }), _jsx("p", { className: "text-sm text-gray-300 opacity-80", children: "Desliza hacia arriba para la siguiente frase" }), _jsx("div", { className: "flex justify-center pt-2", children: _jsx(motion.div, { animate: { y: [0, 5, 0] }, transition: { duration: 1.5, repeat: Infinity }, className: "text-gray-300", children: "\u2191" }) })] })] })] }));
};
