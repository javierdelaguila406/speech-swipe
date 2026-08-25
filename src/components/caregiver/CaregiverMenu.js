import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
export const CaregiverMenu = ({ isOpen, onClose, onManagePhrases, onManageCategories, onViewFavorites, onViewProgress, onSettings }) => {
    const menuItems = [
        {
            icon: '📋',
            title: 'FRASES',
            description: 'Administrar todas las frases',
            onClick: onManagePhrases
        },
        {
            icon: '🏷️',
            title: 'CATEGORÍAS',
            description: 'Organizar categorías',
            onClick: onManageCategories
        },
        {
            icon: '⭐',
            title: 'FAVORITOS',
            description: 'Frases importantes',
            onClick: onViewFavorites
        },
        {
            icon: '📊',
            title: 'PROGRESO',
            description: 'Estadísticas y reportes',
            onClick: onViewProgress
        },
        {
            icon: '⚙️',
            title: 'CONFIGURACIÓN',
            description: 'Ajustes de la aplicación',
            onClick: onSettings
        }
    ];
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "MEN\u00DA CUIDADOR", children: _jsxs("div", { className: "space-y-3", children: [menuItems.map((item, index) => (_jsx("button", { onClick: item.onClick, className: "w-full bg-dark-tertiary hover:bg-opacity-80 border border-white border-opacity-10 rounded-lg p-4 text-left transition-all duration-200 active:scale-95", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("span", { className: "text-2xl", children: item.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-bold text-white", children: item.title }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: item.description })] })] }) }, index))), _jsx("div", { className: "border-t border-white border-opacity-10 my-2" }), _jsx(Button, { size: "lg", variant: "secondary", onClick: onClose, className: "w-full", children: "Volver al feed" })] }) }));
};
