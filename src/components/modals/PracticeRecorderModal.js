import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { useRecording } from '@/hooks/useRecording';
export const PracticeRecorderModal = ({ isOpen, onClose, phrase }) => {
    const { isRecording, recordingTime, audioUrl, startRecording, stopRecording, clearRecording } = useRecording();
    const audioRef = useRef(null);
    const [isPlayingRecording, setIsPlayingRecording] = useState(false);
    const [error, setError] = useState(null);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const handleStartRecording = async () => {
        try {
            setError(null);
            await startRecording();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al acceder al micrófono');
        }
    };
    const handleStopRecording = () => {
        stopRecording();
    };
    const handlePlayRecording = async () => {
        if (audioRef.current) {
            if (isPlayingRecording) {
                audioRef.current.pause();
                setIsPlayingRecording(false);
            }
            else {
                await audioRef.current.play();
                setIsPlayingRecording(true);
            }
        }
    };
    const handleRetry = () => {
        clearRecording();
        handleStartRecording();
    };
    const handleClose = () => {
        if (isRecording) {
            stopRecording();
        }
        if (audioUrl) {
            clearRecording();
        }
        onClose();
    };
    useEffect(() => {
        return () => {
            if (isRecording) {
                stopRecording();
            }
        };
    }, []);
    return (_jsx(Modal, { isOpen: isOpen, onClose: handleClose, title: "Practicar", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-400 mb-3", children: "Ahora dilo t\u00FA" }), _jsx("h3", { className: "text-2xl font-bold text-white", children: phrase.text })] }), !audioUrl && (_jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, animate: isRecording ? { scale: [1, 1.1, 1] } : {}, transition: isRecording ? { duration: 0.6, repeat: Infinity } : {}, onClick: isRecording ? handleStopRecording : handleStartRecording, disabled: !!error, className: `w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-200 ${isRecording
                                        ? 'bg-accent-practice'
                                        : 'bg-accent-practice hover:bg-opacity-90'}`, children: "\uD83C\uDFA4" }), isRecording && (_jsx(motion.div, { className: "absolute inset-0 rounded-full border-4 border-accent-practice", animate: { scale: [1, 1.5], opacity: [1, 0] }, transition: { duration: 1, repeat: Infinity } }))] }), isRecording && (_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-300 font-semibold", children: formatTime(recordingTime) }), _jsx("p", { className: "text-sm text-accent-practice", children: "Grabando..." })] })), error && (_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-red-400", children: error }), _jsx(Button, { size: "md", onClick: handleStartRecording, className: "mt-2", children: "Reintentar" })] }))] })), audioUrl && (_jsxs("div", { className: "space-y-4", children: [_jsx("audio", { ref: audioRef, src: audioUrl }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { size: "md", variant: "secondary", onClick: handlePlayRecording, className: "flex-1", children: isPlayingRecording ? '⏸ Pausar' : '▶ Escuchar' }), _jsx(Button, { size: "md", variant: "secondary", onClick: handleRetry, className: "flex-1", children: "\uD83D\uDD04 Reintentar" })] })] })), _jsx(Button, { size: "lg", variant: "secondary", onClick: handleClose, className: "w-full", children: "Cerrar" })] }) }));
};
