import { useState, useRef, useCallback, useEffect } from 'react';

interface PullToRefreshProps {
  /** Container ref — pull only activates when the page is scrolled to the top */
  scrollRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

// El documento (window) es quien hace scroll en esta app, no el contenedor.
const getScrollTop = (el: HTMLElement) => Math.max(el.scrollTop, window.scrollY);

const THRESHOLD = 70;
const MAX_PULL = 110;

/**
 * Pull-to-refresh for mobile PWA.
 * Listens on the given container; scroll position is read from the container or window.
 */
export default function PullToRefresh({ scrollRef, children }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const isPullingRef = useRef(false);
  const [isPulling, setIsPulling] = useState(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el || getScrollTop(el) > 5) return;
      touchStartY.current = e.touches[0].clientY;
      isPullingRef.current = true;
      setIsPulling(true);
    },
    [scrollRef]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!isPullingRef.current || !el || getScrollTop(el) > 5) {
        isPullingRef.current = false;
        setIsPulling(false);
        setPullDistance(0);
        return;
      }

      const deltaY = e.touches[0].clientY - touchStartY.current;
      if (deltaY > 0) {
        const distance = Math.min(deltaY * 0.5, MAX_PULL);
        setPullDistance(distance);
        if (distance > 10) e.preventDefault();
      }
    },
    [scrollRef]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isPullingRef.current) return;
    isPullingRef.current = false;
    setIsPulling(false);

    if (pullDistance >= THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(THRESHOLD);
      window.location.reload();
    } else {
      setPullDistance(0);
    }
  }, [pullDistance]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const opts: AddEventListenerOptions = { passive: false };
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, opts);
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollRef, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const showIndicator = pullDistance > 0 || isRefreshing;
  const isReady = pullDistance >= THRESHOLD;

  return (
    <>
      {showIndicator && (
        <div
          className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none transition-opacity"
          style={{
            height: `${pullDistance}px`,
            opacity: Math.min(pullDistance / THRESHOLD, 1),
          }}
        >
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm ${
              isReady || isRefreshing
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 bg-white'
            }`}
          >
            {isRefreshing ? (
              <svg className="w-4 h-4 text-indigo-500 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <svg
                className={`w-4 h-4 transition-transform ${isReady ? 'text-indigo-500 rotate-180' : 'text-gray-400'}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            )}
          </div>
        </div>
      )}
      <div
        style={{
          transform: showIndicator ? `translateY(${pullDistance}px)` : undefined,
          transition: isPulling ? 'none' : 'transform 0.3s ease',
        }}
      >
        {children}
      </div>
    </>
  );
}
