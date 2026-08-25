import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useRecording } from '@/hooks/useRecording';
import { Button } from '@/components/common/Button';
import { WaveformVisualizer } from '@/components/common/WaveformVisualizer';
import { COLORS } from '@/config/theme';
export const AudioRecorder = ({ title, description, onRecordingDone, onClose, currentAudioUrl }) => {
    const { isRecording, recordingTime, audioUrl, error, startRecording, stopRecording, clearRecording } = useRecording();
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const handleStart = async () => {
        try {
            await startRecording();
        }
        catch (err) {
            console.error('Recording error:', err);
        }
    };
    const handleStop = () => {
        stopRecording();
    };
    const handleSave = () => {
        if (audioUrl) {
            onRecordingDone(audioUrl);
            onClose();
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-dark-surface rounded-2xl w-full max-w-sm mx-4 p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: title }), _jsx("p", { className: "text-sm text-gray-400 mt-1", children: description })] }), _jsxs("div", { className: "space-y-4", children: [error && (_jsx("div", { className: "bg-red-900 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg p-3", children: _jsx("p", { className: "text-sm text-red-300", children: error }) })), !audioUrl && !currentAudioUrl && (_jsxs(_Fragment, { children: [_jsx(WaveformVisualizer, { isAnimating: isRecording, color: COLORS.action.practice }), isRecording && (_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-bold text-white", children: formatTime(recordingTime) }), _jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Grabando..." })] })), _jsx("div", { className: "flex gap-3", children: !isRecording ? (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleStart, disabled: !!error, className: "flex-1 h-20 rounded-full bg-accent-practice hover:bg-opacity-90 flex items-center justify-center text-4xl transition-all duration-200 disabled:opacity-50", children: "\uD83C\uDFA4" })) : (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleStop, className: "flex-1 h-20 rounded-full bg-red-600 hover:bg-opacity-90 flex items-center justify-center text-4xl transition-all duration-200", children: "\u23F9" })) })] })), (audioUrl || currentAudioUrl) && (_jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm text-green-400 text-center", children: "\u2713 Audio grabado" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "md", variant: "secondary", onClick: clearRecording, className: "flex-1", children: "\uD83D\uDD04 Reintentar" }), _jsx(Button, { size: "md", onClick: handleSave, className: "flex-1", children: "\u2713 Usar este audio" })] })] }))] }), _jsx(Button, { size: "lg", variant: "secondary", onClick: onClose, className: "w-full", children: "Cancelar" })] }) }));
};
