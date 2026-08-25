import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { FeedScreen } from '@/components/feed/FeedScreen';
import { ToastContainer } from '@/components/common/Toast';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useAppStore } from '@/store/appStore';
function AppContent() {
    const { loadPhrases, loadFavorites } = useAppStore();
    useEffect(() => {
        loadPhrases();
        loadFavorites();
    }, [loadPhrases, loadFavorites]);
    return (_jsxs(_Fragment, { children: [_jsx(FeedScreen, {}), _jsx(ToastContainer, {})] }));
}
function App() {
    return (_jsx(ErrorBoundary, { children: _jsx(AppContent, {}) }));
}
export default App;
