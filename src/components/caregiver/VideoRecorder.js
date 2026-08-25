import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
export const VideoRecorder = ({ title, onRecordingDone, onClose }) => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const chunksRef = useRef([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isPermissionGranted, setIsPermissionGranted] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [error, setError] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const timerRef = useRef(null);
    useEffect(() => {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' },
                    audio: true
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                streamRef.current = stream;
                setIsPermissionGranted(true);
            }
            catch (err) {
                setError('No se pudo acceder a la cámara');
                console.error('Camera error:', err);
            }
        };
        initCamera();
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);
    const handleStartRecording = () => {
        if (!streamRef.current)
            return;
        chunksRef.current = [];
        const mediaRecorder = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunksRef.current.push(event.data);
            }
        };
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
        };
        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        let seconds = 0;
        timerRef.current = setInterval(() => {
            seconds += 1;
            setRecordingTime(seconds);
            if (seconds >= 30) {
                // Máximo 30 segundos
                mediaRecorder.stop();
                setIsRecording(false);
                if (timerRef.current)
                    clearInterval(timerRef.current);
            }
        }, 1000);
    };
    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };
    const handleRetry = () => {
        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }
        setVideoUrl(null);
        setRecordingTime(0);
    };
    const handleSave = () => {
        if (videoUrl) {
            onRecordingDone(videoUrl);
            onClose();
        }
    };
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-dark-surface rounded-2xl w-full max-w-sm mx-4 p-6 space-y-4", children: [_jsx("h3", { className: "text-xl font-bold text-white", children: title }), error ? (_jsxs("div", { className: "bg-red-900 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg p-4", children: [_jsx("p", { className: "text-sm text-red-300", children: error }), _jsx(Button, { size: "md", onClick: onClose, className: "mt-4 w-full", children: "Cerrar" })] })) : !isPermissionGranted ? (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-gray-400 mb-4", children: "Cargando c\u00E1mara..." }) })) : (_jsxs(_Fragment, { children: [!videoUrl && (_jsx("video", { ref: videoRef, autoPlay: true, muted: true, playsInline: true, className: "w-full rounded-lg bg-black" })), videoUrl && (_jsx("video", { src: videoUrl, className: "w-full rounded-lg bg-black", controls: true })), isRecording && (_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-bold text-accent-practice", children: formatTime(recordingTime) }), _jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Grabando... (m\u00E1x 30s)" })] })), _jsxs("div", { className: "space-y-3", children: [!videoUrl && (_jsx("button", { onClick: isRecording ? handleStopRecording : handleStartRecording, className: `w-full h-16 rounded-lg font-semibold text-white transition-all duration-200 ${isRecording
                                        ? 'bg-red-600 hover:bg-red-700'
                                        : 'bg-accent-practice hover:bg-opacity-90'}`, children: isRecording ? '⏹ Detener (Toca para parar)' : '🎥 Comenzar a grabar' })), videoUrl && (_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "md", variant: "secondary", onClick: handleRetry, className: "flex-1", children: "\uD83D\uDD04 Reintentar" }), _jsx(Button, { size: "md", onClick: handleSave, className: "flex-1", children: "\u2713 Usar video" })] }))] })] })), _jsx(Button, { size: "lg", variant: "secondary", onClick: onClose, className: "w-full", children: "Cancelar" })] }) }));
};
