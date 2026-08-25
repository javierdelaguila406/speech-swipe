import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from './Button';
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "handleReset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.setState({ hasError: false, error: null });
            }
        });
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "flex items-center justify-center h-screen bg-dark-bg", children: _jsxs("div", { className: "max-w-sm mx-4 bg-dark-surface border border-red-500 border-opacity-50 rounded-lg p-6 text-center space-y-4", children: [_jsx("div", { className: "text-4xl", children: "\u26A0\uFE0F" }), _jsx("h2", { className: "text-xl font-bold text-white", children: "Algo sali\u00F3 mal" }), _jsx("p", { className: "text-sm text-gray-400", children: this.state.error?.message || 'Ha ocurrido un error inesperado' }), _jsxs("div", { className: "space-y-2", children: [_jsx(Button, { size: "lg", onClick: this.handleReset, className: "w-full", children: "Reintentar" }), _jsx(Button, { size: "lg", variant: "secondary", onClick: () => window.location.reload(), className: "w-full", children: "Recargar p\u00E1gina" })] })] }) }));
        }
        return this.props.children;
    }
}
