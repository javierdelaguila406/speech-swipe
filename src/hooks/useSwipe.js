import { useEffect, useRef } from 'react';
export const useSwipe = (element, handlers) => {
    const touchStart = useRef({ x: 0, y: 0 });
    useEffect(() => {
        if (!element.current)
            return;
        const handleTouchStart = (e) => {
            touchStart.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        };
        const handleTouchEnd = (e) => {
            const touchEnd = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            };
            const dx = touchEnd.x - touchStart.current.x;
            const dy = touchEnd.y - touchStart.current.y;
            const threshold = handlers.threshold || 30;
            // Detectar dirección predominante
            if (Math.abs(dy) > Math.abs(dx)) {
                // Swipe vertical
                if (dy < -threshold && handlers.onSwipeUp) {
                    handlers.onSwipeUp();
                }
                else if (dy > threshold && handlers.onSwipeDown) {
                    handlers.onSwipeDown();
                }
            }
            else {
                // Swipe horizontal
                if (dx < -threshold && handlers.onSwipeLeft) {
                    handlers.onSwipeLeft();
                }
                else if (dx > threshold && handlers.onSwipeRight) {
                    handlers.onSwipeRight();
                }
            }
        };
        const el = element.current;
        el.addEventListener('touchstart', handleTouchStart, false);
        el.addEventListener('touchend', handleTouchEnd, false);
        return () => {
            el.removeEventListener('touchstart', handleTouchStart);
            el.removeEventListener('touchend', handleTouchEnd);
        };
    }, [element, handlers]);
};
