import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const LoadingSkeleton = () => {
    return (_jsx("div", { className: "space-y-4 p-4", children: [1, 2, 3].map((i) => (_jsx(motion.div, { className: "bg-dark-tertiary rounded-lg h-20", animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 1.5, repeat: Infinity } }, i))) }));
};
export const PhraseCardSkeleton = () => {
    return (_jsx(motion.div, { className: "bg-dark-surface rounded-3xl aspect-video overflow-hidden", animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 1.5, repeat: Infinity } }));
};
