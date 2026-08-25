import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseClasses = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClasses = {
        primary: 'bg-accent-listen hover:bg-opacity-90 text-white active:scale-95',
        secondary: 'bg-dark-tertiary hover:bg-opacity-90 text-white border border-white border-opacity-10 active:scale-95',
        ghost: 'text-white hover:bg-white hover:bg-opacity-10 active:scale-95'
    };
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };
    return (_jsx("button", { className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`, ...props }));
};
