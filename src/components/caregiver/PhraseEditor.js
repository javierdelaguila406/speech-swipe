import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useToastStore } from '@/store/toastStore';
import { storageService } from '@/services/storageService';
const CATEGORIES = ['Necesidades', 'Deseos', 'Dolor', 'Ayuda', 'Respuestas', 'Saludos', 'Otros'];
const validationRules = {
    text: {
        required: true,
        minLength: 1,
        maxLength: 100
    },
    category: {
        required: true
    },
    keyword: {
        maxLength: 50
    }
};
export const PhraseEditor = ({ phrase, onSave, onCancel }) => {
    const { addToast } = useToastStore();
    const [imageUrl, setImageUrl] = useState(phrase?.image.url || '');
    const [isVisible, setIsVisible] = useState(phrase?.isVisible ?? true);
    const [isFavorite, setIsFavorite] = useState(phrase?.isFavorite ?? false);
    const [order, setOrder] = useState(phrase?.order ?? 999);
    const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormValidation({
        text: phrase?.text || '',
        keyword: phrase?.keyword || '',
        category: phrase?.category || 'Necesidades'
    }, validationRules, async (formValues) => {
        try {
            const newPhrase = {
                id: phrase?.id || crypto.randomUUID(),
                text: formValues.text,
                keyword: formValues.keyword,
                category: formValues.category,
                image: { url: imageUrl, alt: formValues.text },
                normalAudio: phrase?.normalAudio || { url: '', duration: 0 },
                slowAudio: phrase?.slowAudio || { url: '', duration: 0 },
                lipVideo: phrase?.lipVideo || null,
                isVisible,
                isFavorite,
                order,
                createdAt: phrase?.createdAt || Date.now(),
                updatedAt: Date.now()
            };
            // Save to IndexedDB
            await storageService.savePhrase(newPhrase);
            addToast(`Frase "${formValues.text}" guardada correctamente`, 'success');
            onSave(newPhrase);
        }
        catch (error) {
            addToast('Error al guardar la frase', 'error');
            console.error('Save error:', error);
        }
    });
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                addToast('La imagen debe ser menor a 5MB', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target?.result);
                addToast('Imagen cargada correctamente', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    return (_jsxs("div", { className: "fixed inset-0 bg-dark-bg z-40 overflow-y-auto", children: [_jsx("div", { className: "sticky top-0 bg-dark-surface border-b border-white border-opacity-5 p-4 z-50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("button", { onClick: onCancel, className: "text-white hover:text-gray-300 transition-colors", "aria-label": "Cancelar", children: "\u2190 Cancelar" }), _jsx("h2", { className: "text-lg font-bold text-white", children: phrase ? 'EDITAR FRASE' : 'NUEVA FRASE' }), _jsx("div", { className: "w-6" })] }) }), _jsxs("div", { className: "p-4 space-y-6 pb-24", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white mb-2", children: "Texto de la frase *" }), _jsx("textarea", { name: "text", value: values.text, onChange: handleChange, onBlur: handleBlur, placeholder: "QUIERO AGUA", maxLength: 100, className: `w-full bg-dark-tertiary border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none transition-colors ${errors.text ? 'border-red-500' : 'border-white border-opacity-10 focus:border-accent-listen'}`, rows: 3 }), _jsxs("div", { className: "flex justify-between items-center mt-1", children: [_jsxs("p", { className: "text-xs text-gray-400", children: [values.text.length, " / 100"] }), errors.text && _jsx("p", { className: "text-xs text-red-400", children: errors.text })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white mb-2", children: "Categor\u00EDa *" }), _jsx("select", { name: "category", value: values.category, onChange: handleChange, onBlur: handleBlur, className: `w-full bg-dark-tertiary border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${errors.category ? 'border-red-500' : 'border-white border-opacity-10 focus:border-accent-listen'}`, children: CATEGORIES.map(cat => (_jsx("option", { value: cat, children: cat }, cat))) }), errors.category && _jsx("p", { className: "text-xs text-red-400 mt-1", children: errors.category })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white mb-2", children: "Palabra clave" }), _jsx("input", { type: "text", name: "keyword", value: values.keyword, onChange: handleChange, onBlur: handleBlur, placeholder: "agua", className: `w-full bg-dark-tertiary border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none transition-colors ${errors.keyword ? 'border-red-500' : 'border-white border-opacity-10 focus:border-accent-listen'}` }), errors.keyword && _jsx("p", { className: "text-xs text-red-400 mt-1", children: errors.keyword })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white mb-2", children: "Imagen" }), imageUrl && (_jsx("div", { className: "mb-3 rounded-lg overflow-hidden border border-white border-opacity-10", children: _jsx("img", { src: imageUrl, alt: "Preview", className: "w-full h-40 object-cover" }) })), _jsx("input", { type: "file", accept: "image/*", onChange: handleImageUpload, className: "w-full bg-dark-tertiary border border-white border-opacity-10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-listen file:bg-accent-listen file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:cursor-pointer" }), _jsx("p", { className: "text-xs text-gray-400 mt-1", children: "M\u00E1ximo 5MB" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white mb-2", children: "Audio Normal" }), _jsxs("div", { className: "bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4 space-y-2", children: [_jsx("p", { className: "text-xs text-gray-400", children: "Graba la pronunciaci\u00F3n normal" }), _jsx(Button, { size: "sm", variant: "secondary", className: "w-full", children: "\uD83C\uDFA4 Grabar Audio" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white mb-2", children: "Audio Lento" }), _jsxs("div", { className: "bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4 space-y-2", children: [_jsx("p", { className: "text-xs text-gray-400", children: "Graba la pronunciaci\u00F3n lentamente" }), _jsx(Button, { size: "sm", variant: "secondary", className: "w-full", children: "\uD83C\uDFA4 Grabar Audio" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white mb-2", children: "Video de Labios (Opcional)" }), _jsxs("div", { className: "bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4 space-y-2", children: [_jsx("p", { className: "text-xs text-gray-400", children: "Graba un video mostrando los labios" }), _jsx(Button, { size: "sm", variant: "secondary", className: "w-full", children: "\uD83D\uDCF9 Grabar Video" })] })] }), _jsxs("div", { className: "space-y-3 border-t border-white border-opacity-5 pt-4", children: [_jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [_jsx("button", { type: "button", onClick: () => setIsVisible(!isVisible), className: `w-12 h-6 rounded-full transition-colors ${isVisible ? 'bg-accent-listen' : 'bg-gray-600'}`, children: _jsx("div", { className: `w-5 h-5 rounded-full bg-white transition-transform ${isVisible ? 'translate-x-6' : 'translate-x-0.5'}` }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-white", children: "Visible en la app" }), _jsx("p", { className: "text-xs text-gray-400", children: isVisible ? 'Visible' : 'Oculta' })] })] }), _jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [_jsx("button", { type: "button", onClick: () => setIsFavorite(!isFavorite), className: `w-12 h-6 rounded-full transition-colors ${isFavorite ? 'bg-yellow-500' : 'bg-gray-600'}`, children: _jsx("div", { className: `w-5 h-5 rounded-full bg-white transition-transform ${isFavorite ? 'translate-x-6' : 'translate-x-0.5'}` }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-white", children: "Favorita" }), _jsx("p", { className: "text-xs text-gray-400", children: isFavorite ? 'Es favorita' : 'No es favorita' })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-white mb-2", children: "Orden en el feed" }), _jsx("input", { type: "number", value: order, onChange: (e) => setOrder(parseInt(e.target.value) || 999), min: "1", max: "999", className: "w-full bg-dark-tertiary border border-white border-opacity-10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-listen" }), _jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Menor n\u00FAmero = m\u00E1s arriba en el feed" })] })] }), _jsxs("div", { className: "fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-white border-opacity-5 p-4 space-y-2", children: [_jsx(Button, { size: "lg", onClick: handleSubmit, disabled: isSubmitting, className: "w-full", children: isSubmitting ? '⏳ Guardando...' : '✓ Guardar' }), _jsx(Button, { size: "lg", variant: "secondary", onClick: onCancel, disabled: isSubmitting, className: "w-full", children: "Cancelar" })] })] }));
};
