import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Button } from '@/components/common/Button';
export const PronunciationEvaluator = ({ expectedText, onClose }) => {
    const { isListening, transcript, finalTranscript, error, confidence, startListening, stopListening, resetTranscript, isBrowserSupported } = useSpeechRecognition({
        language: 'es-ES',
        continuous: false,
        interimResults: true
    });
    const calculateSimilarity = (str1, str2) => {
        const s1 = str1.toLowerCase().trim();
        const s2 = str2.toLowerCase().trim();
        if (s1 === s2)
            return 100;
        const longer = s1.length > s2.length ? s1 : s2;
        const shorter = s1.length > s2.length ? s2 : s1;
        if (longer.length === 0)
            return 100;
        const editDistance = getEditDistance(shorter, longer);
        return Math.round(((longer.length - editDistance) / longer.length) * 100);
    };
    const getEditDistance = (s1, s2) => {
        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                }
                else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    };
    const similarity = finalTranscript ? calculateSimilarity(finalTranscript, expectedText) : 0;
    const statusMessage = () => {
        if (error)
            return error;
        if (isListening)
            return 'Escuchando...';
        if (!finalTranscript)
            return 'Presiona el botón para comenzar';
        if (similarity >= 80)
            return '✓ ¡Excelente pronunciación!';
        if (similarity >= 60)
            return '◐ Muy bien, casi perfecto';
        if (similarity >= 40)
            return '◑ Buen intento, sigue practicando';
        return '◎ Intenta de nuevo';
    };
    const getStatusColor = () => {
        if (similarity >= 80)
            return '#14b8a6'; // Turquesa
        if (similarity >= 60)
            return '#fbbf24'; // Amarillo
        if (similarity >= 40)
            return '#f97316'; // Naranja
        return '#ef4444'; // Rojo
    };
    if (!isBrowserSupported) {
        return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-dark-surface rounded-2xl w-full max-w-sm mx-4 p-6", children: [_jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "\u26A0\uFE0F No Soportado" }), _jsx("p", { className: "text-sm text-gray-400 mb-4", children: "El reconocimiento de voz no est\u00E1 soportado en tu navegador. Usa Chrome, Edge o Safari." }), _jsx(Button, { size: "lg", onClick: onClose, className: "w-full", children: "Cerrar" })] }) }));
    }
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-dark-surface rounded-2xl w-full max-w-sm mx-4 p-6 space-y-4", children: [_jsx("h3", { className: "text-lg font-bold text-white", children: "Evaluar Pronunciaci\u00F3n" }), _jsxs("div", { className: "bg-dark-tertiary rounded-lg p-4", children: [_jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Esperado:" }), _jsx("p", { className: "text-lg font-bold text-white", children: expectedText })] }), finalTranscript && (_jsxs("div", { className: "bg-dark-tertiary rounded-lg p-4", children: [_jsx("p", { className: "text-xs text-gray-400 mb-1", children: "Escuchado:" }), _jsx("p", { className: "text-lg font-bold text-accent-listen", children: finalTranscript })] })), transcript && !finalTranscript && (_jsxs("div", { className: "bg-dark-tertiary rounded-lg p-4 opacity-75", children: [_jsx("p", { className: "text-xs text-gray-400 mb-1", children: "En vivo:" }), _jsx("p", { className: "text-sm text-gray-300", children: transcript })] })), _jsxs(motion.div, { className: "text-center p-4 rounded-lg", style: {
                        backgroundColor: `${getStatusColor()}20`,
                        borderColor: getStatusColor(),
                        borderWidth: 2
                    }, children: [_jsx("p", { style: { color: getStatusColor() }, className: "font-semibold", children: statusMessage() }), similarity > 0 && (_jsxs("p", { className: "text-sm text-gray-400 mt-1", children: ["Similitud: ", similarity, "% | Confianza: ", Math.round(confidence * 100), "%"] }))] }), finalTranscript && (_jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "w-full bg-dark-tertiary rounded-full h-2 overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${similarity}%` }, transition: { duration: 0.8, ease: 'easeOut' }, style: { backgroundColor: getStatusColor(), height: '100%' } }) }), _jsxs("p", { className: "text-xs text-gray-400 text-right", children: [similarity, "%"] })] })), _jsxs("div", { className: "space-y-2", children: [!finalTranscript ? (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: isListening ? stopListening : startListening, className: `w-full h-14 rounded-lg font-semibold text-white transition-all ${isListening
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-accent-practice hover:bg-opacity-90'}`, children: isListening ? '⏹ Detener' : '🎤 Comenzar' })) : (_jsx(Button, { size: "lg", variant: "secondary", onClick: () => {
                                resetTranscript();
                            }, className: "w-full", children: "\uD83D\uDD04 Intentar de nuevo" })), _jsx(Button, { size: "lg", variant: "secondary", onClick: onClose, className: "w-full", children: "Cerrar" })] })] }) }));
};
