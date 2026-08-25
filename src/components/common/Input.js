import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Input = ({ label, error, className = '', ...props }) => {
    return (_jsxs("div", { className: "space-y-1", children: [label && (_jsx("label", { className: "block text-sm font-semibold text-white", children: label })), _jsx("input", { className: `w-full bg-dark-tertiary border border-white border-opacity-10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-listen transition-colors ${className}`, ...props }), error && (_jsx("p", { className: "text-xs text-red-400", children: error }))] }));
};
export const TextArea = ({ label, error, className = '', ...props }) => {
    return (_jsxs("div", { className: "space-y-1", children: [label && (_jsx("label", { className: "block text-sm font-semibold text-white", children: label })), _jsx("textarea", { className: `w-full bg-dark-tertiary border border-white border-opacity-10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-listen transition-colors ${className}`, ...props }), error && (_jsx("p", { className: "text-xs text-red-400", children: error }))] }));
};
