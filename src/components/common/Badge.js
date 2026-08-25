import { jsx as _jsx } from "react/jsx-runtime";
export const Badge = ({ text, className = '' }) => {
    return (_jsx("span", { className: `inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded text-accent-listen bg-purple-900 bg-opacity-50 ${className}`, children: text }));
};
