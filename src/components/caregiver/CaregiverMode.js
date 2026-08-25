import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { CaregiverMenu } from './CaregiverMenu';
import { PhraseManager } from './PhraseManager';
import { PhraseEditor } from './PhraseEditor';
import { FavoritesView } from './FavoritesView';
import { ProgressView } from './ProgressView';
export const CaregiverMode = ({ isOpen, onClose }) => {
    const [screen, setScreen] = useState('menu');
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    const handleOpenMenu = () => setScreen('menu');
    const handleOpenManager = () => setScreen('manager');
    const handleOpenEditor = (phrase) => {
        setSelectedPhrase(phrase);
        setScreen('editor');
    };
    const handleOpenFavorites = () => setScreen('favorites');
    const handleOpenProgress = () => setScreen('progress');
    const handleSavePhrase = (phrase) => {
        console.log('Save phrase:', phrase);
        // Aquí guardaremos la frase en el store
        setScreen('manager');
    };
    const handleClose = () => {
        setScreen('menu');
        onClose();
    };
    const handleBackToMenu = () => setScreen('menu');
    if (!isOpen)
        return null;
    return (_jsxs(_Fragment, { children: [screen === 'menu' && (_jsx(CaregiverMenu, { isOpen: isOpen, onClose: handleClose, onManagePhrases: handleOpenManager, onManageCategories: () => console.log('Categories'), onViewFavorites: handleOpenFavorites, onViewProgress: handleOpenProgress, onSettings: () => console.log('Settings') })), screen === 'manager' && (_jsx(PhraseManager, { onBack: handleOpenMenu, onEditPhrase: handleOpenEditor })), screen === 'editor' && (_jsx(PhraseEditor, { phrase: selectedPhrase, onSave: handleSavePhrase, onCancel: () => {
                    setSelectedPhrase(null);
                    setScreen('manager');
                } })), screen === 'favorites' && (_jsx(FavoritesView, { onBack: handleBackToMenu })), screen === 'progress' && (_jsx(ProgressView, { onBack: handleBackToMenu }))] }));
};
