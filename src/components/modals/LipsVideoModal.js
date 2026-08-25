import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
export const LipsVideoModal = ({ isOpen, onClose, phrase }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    if (!phrase.lipVideo)
        return null;
    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };
    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };
    const handleRepeat = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setIsPlaying(true);
        }
    };
    const handleSlow = () => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
            videoRef.current.play();
            setIsPlaying(true);
        }
    };
    const formatTime = (seconds) => {
        if (!seconds)
            return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Ver Labios", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "text-center py-2", children: _jsx("h3", { className: "text-2xl font-bold text-white", children: phrase.text }) }), _jsx("div", { className: "relative w-full bg-black rounded-lg overflow-hidden", children: _jsx("video", { ref: videoRef, src: phrase.lipVideo.url, className: "w-full aspect-video object-cover", onTimeUpdate: () => {
                            if (videoRef.current) {
                                setCurrentTime(videoRef.current.currentTime);
                            }
                        }, onLoadedMetadata: () => {
                            if (videoRef.current) {
                                setDuration(videoRef.current.duration);
                            }
                        }, onEnded: () => setIsPlaying(false) }) }), _jsx("div", { className: "space-y-2", children: _jsxs("div", { className: "flex gap-2 text-xs text-gray-400", children: [_jsx("span", { children: formatTime(currentTime) }), _jsx("div", { className: "flex-1 bg-dark-tertiary rounded-full h-1 relative", children: _jsx("div", { className: "bg-accent-listen h-full rounded-full", style: { width: `${(currentTime / duration) * 100}%` } }) }), _jsx("span", { children: formatTime(duration) })] }) }), _jsxs("div", { className: "flex gap-3 justify-center", children: [_jsx(Button, { size: "md", variant: "secondary", onClick: handleRepeat, children: "\u27F3 Repetir" }), _jsx(Button, { size: "md", onClick: isPlaying ? handlePause : handlePlay, children: isPlaying ? '⏸ Pausa' : '▶ Play' }), _jsx(Button, { size: "md", variant: "secondary", onClick: handleSlow, children: "\uD83D\uDC22 Lento" })] }), _jsx(Button, { size: "lg", variant: "secondary", onClick: onClose, className: "w-full", children: "Volver" })] }) }));
};
