import { useRef, useCallback, useState, useEffect } from 'react';
export const useAudio = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
        const audio = audioRef.current;
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);
    const play = useCallback(async (url, speed = 1) => {
        if (!audioRef.current)
            return;
        try {
            audioRef.current.src = url;
            audioRef.current.playbackRate = speed;
            await audioRef.current.play();
        }
        catch (error) {
            console.error('Error playing audio:', error);
        }
    }, []);
    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }, []);
    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);
    const seek = useCallback((time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    }, []);
    const setPlaybackRate = useCallback((rate) => {
        if (audioRef.current) {
            audioRef.current.playbackRate = rate;
        }
    }, []);
    return {
        isPlaying,
        currentTime,
        duration,
        play,
        pause,
        stop,
        seek,
        setPlaybackRate
    };
};
