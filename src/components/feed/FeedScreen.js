import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { useSwipe } from '@/hooks/useSwipe';
import { useAudio } from '@/hooks/useAudio';
import { useRecording } from '@/hooks/useRecording';
import { useTripleTap } from '@/hooks/useTripleTap';
import { TopBar } from './TopBar';
import { PhraseCard } from './PhraseCard';
import { ActionBar } from './ActionBar';
import { LipsVideoModal } from '@/components/modals/LipsVideoModal';
import { PracticeRecorderModal } from '@/components/modals/PracticeRecorderModal';
import { CaregiverMode } from '@/components/caregiver/CaregiverMode';
export const FeedScreen = () => {
    const containerRef = useRef(null);
    const [showLipsModal, setShowLipsModal] = useState(false);
    const [showPracticeModal, setShowPracticeModal] = useState(false);
    const [showCaregiverMode, setShowCaregiverMode] = useState(false);
    // Store
    const { phrases, currentIndex, favorites, isPlaying, isRecording, nextPhrase, previousPhrase, getCurrentPhrase, toggleFavorite, isFavorite, setIsPlaying, setIsRecording, loadFavorites } = useAppStore();
    // Hooks
    const { play, pause, stop } = useAudio();
    const { startRecording, stopRecording } = useRecording();
    const currentPhrase = getCurrentPhrase();
    // Cargar favoritas al inicio
    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);
    // Triple tap para menú cuidador
    useTripleTap(() => {
        setShowCaregiverMode(true);
    }, 300);
    // Swipe gestures
    useSwipe(containerRef, {
        onSwipeUp: nextPhrase,
        onSwipeDown: previousPhrase,
        threshold: 30
    });
    // Handlers
    const handleListen = async () => {
        if (!currentPhrase)
            return;
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        }
        else {
            setIsPlaying(true);
            await play(currentPhrase.normalAudio.url, 1);
        }
    };
    const handleSlow = async () => {
        if (!currentPhrase)
            return;
        setIsPlaying(true);
        await play(currentPhrase.slowAudio.url, 0.75);
    };
    const handleLips = () => {
        setShowLipsModal(true);
    };
    const handlePractice = () => {
        setShowPracticeModal(true);
    };
    const handleFavoriteToggle = () => {
        if (currentPhrase) {
            toggleFavorite(currentPhrase.id);
        }
    };
    if (!currentPhrase) {
        return (_jsx("div", { className: "flex items-center justify-center h-screen bg-dark-bg text-white", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-xl", children: "No hay frases disponibles" }), _jsx("p", { className: "text-gray-400 text-sm mt-2", children: "P\u00EDdele al cuidador que agregue frases" })] }) }));
    }
    return (_jsxs("div", { ref: containerRef, className: "flex flex-col h-screen bg-dark-bg text-white overflow-hidden", children: [_jsx(TopBar, { current: currentIndex, total: phrases.length, isFavorite: isFavorite(currentPhrase.id), onFavoriteToggle: handleFavoriteToggle }), _jsx("div", { className: "flex-1 flex items-center justify-center px-4 py-6 overflow-hidden", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(PhraseCard, { phrase: currentPhrase, isActive: true }, currentPhrase.id) }) }), _jsx(ActionBar, { onListenClick: handleListen, onSlowClick: handleSlow, onLipsClick: handleLips, onPracticeClick: handlePractice, isPlaying: isPlaying, isRecording: isRecording, hasAudio: !!currentPhrase.normalAudio, hasSlowAudio: !!currentPhrase.slowAudio, hasVideo: !!currentPhrase.lipVideo }), _jsx(LipsVideoModal, { isOpen: showLipsModal, onClose: () => setShowLipsModal(false), phrase: currentPhrase }), _jsx(PracticeRecorderModal, { isOpen: showPracticeModal, onClose: () => setShowPracticeModal(false), phrase: currentPhrase }), _jsx(CaregiverMode, { isOpen: showCaregiverMode, onClose: () => setShowCaregiverMode(false) })] }));
};
