import { useRef, useEffect } from 'react';
export const useTripleTap = (callback, delay = 300) => {
    const tapCountRef = useRef(0);
    const tapTimerRef = useRef(null);
    useEffect(() => {
        const handleTap = () => {
            tapCountRef.current += 1;
            if (tapCountRef.current === 1) {
                tapTimerRef.current = setTimeout(() => {
                    tapCountRef.current = 0;
                }, delay);
            }
            if (tapCountRef.current === 3) {
                if (tapTimerRef.current) {
                    clearTimeout(tapTimerRef.current);
                }
                tapCountRef.current = 0;
                callback();
            }
        };
        document.addEventListener('click', handleTap);
        return () => {
            document.removeEventListener('click', handleTap);
            if (tapTimerRef.current) {
                clearTimeout(tapTimerRef.current);
            }
        };
    }, [callback, delay]);
};
