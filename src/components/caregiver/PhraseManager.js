import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/common/Button';
export const PhraseManager = ({ onBack, onEditPhrase }) => {
    const { phrases } = useAppStore();
    const [selectedPhraseId, setSelectedPhraseId] = useState(null);
    const handleDelete = (id) => {
        if (confirm('¿Eliminar esta frase?')) {
            // Implement delete logic
            console.log('Delete phrase:', id);
        }
    };
    const handleNewPhrase = () => {
        onEditPhrase(null);
    };
    const handleEditPhrase = (phrase) => {
        onEditPhrase(phrase);
    };
    return (_jsxs("div", { className: "fixed inset-0 bg-dark-bg z-40 overflow-y-auto", children: [_jsxs("div", { className: "sticky top-0 bg-dark-surface border-b border-white border-opacity-5 p-4 z-50", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("button", { onClick: onBack, className: "text-white hover:text-gray-300 transition-colors", "aria-label": "Volver", children: "\u2190 Volver" }), _jsx("h2", { className: "text-lg font-bold text-white", children: "FRASES" }), _jsx("div", { className: "w-6" })] }), _jsx(Button, { size: "md", onClick: handleNewPhrase, className: "w-full", children: "+ NUEVA FRASE" })] }), _jsx("div", { className: "p-4 space-y-3", children: phrases.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-gray-400", children: "No hay frases" }), _jsx(Button, { size: "md", onClick: handleNewPhrase, className: "mt-4", children: "Crear primera frase" })] })) : (phrases.map((phrase) => (_jsxs("div", { className: `bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4 transition-all duration-200 ${selectedPhraseId === phrase.id ? 'ring-2 ring-accent-listen' : ''}`, children: [_jsxs("div", { className: "flex gap-4 mb-3", children: [_jsx("img", { src: phrase.image.url, alt: phrase.image.alt, className: "w-16 h-16 rounded object-cover", onError: (e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/64?text=Sin+img';
                                    } }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-bold text-white", children: phrase.text }), _jsx("p", { className: "text-xs text-gray-400", children: phrase.category }), _jsxs("div", { className: "flex gap-2 mt-2", children: [phrase.isFavorite && (_jsx("span", { className: "text-xs bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded", children: "\u2B50 Favorita" })), !phrase.isVisible && (_jsx("span", { className: "text-xs bg-red-900 bg-opacity-50 text-red-300 px-2 py-1 rounded", children: "\uD83D\uDC41\uFE0F Oculta" }))] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: () => handleEditPhrase(phrase), className: "flex-1", children: "Editar" }), _jsx(Button, { size: "sm", variant: "secondary", onClick: () => handleDelete(phrase.id), className: "flex-1", children: "Eliminar" })] })] }, phrase.id)))) })] }));
};
