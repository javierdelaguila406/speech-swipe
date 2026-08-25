import { useRef, useCallback, useState, useEffect } from 'react';
export const useRecording = () => {
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const startRecording = useCallback(async () => {
        try {
            setError(null);
            setRecordingTime(0);
            chunksRef.current = [];
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
            };
            mediaRecorder.start();
            setIsRecording(true);
            // Timer
            let seconds = 0;
            timerRef.current = setInterval(() => {
                seconds += 1;
                setRecordingTime(seconds);
            }, 1000);
        }
        catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Error al acceder al micrófono';
            setError(errorMsg);
            console.error('Recording error:', err);
        }
    }, []);
    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            // Detener stream
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        }
    }, [isRecording]);
    const clearRecording = useCallback(() => {
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        setAudioUrl(null);
        setRecordingTime(0);
        setError(null);
    }, [audioUrl]);
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);
    return {
        isRecording,
        recordingTime,
        audioUrl,
        error,
        startRecording,
        stopRecording,
        clearRecording
    };
};
