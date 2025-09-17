'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  const trickle = () => {
    // Progress grows quickly at first, then slows
    setProgress(prev => {
      const delta = (1 - prev) * 0.08; // ease-out
      const next = Math.min(prev + delta, 0.994); // don't reach 1 until finish
      return next;
    });
    rafRef.current = requestAnimationFrame(trickle);
  };

  const start = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setProgress(prev => (prev === 0 || prev === 1 ? 0.02 : prev));
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(trickle);
  };

  const finish = () => {
    runningRef.current = false;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    // Complete and then reset after fade
    setProgress(1);
    // Reset to 0 after the CSS transition completes
    setTimeout(() => setProgress(0), 200);
  };

  // Detect internal link clicks to start progress immediately
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Only left click without modifier keys
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      let el = e.target as HTMLElement | null;
      while (el && el.tagName !== 'A') el = el.parentElement;
      if (!el) return;
      const anchor = el as HTMLAnchorElement;
      const href = anchor.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const url = new URL(href, window.location.href);
      const isSameOrigin = url.origin === window.location.origin;
      const isInternal = isSameOrigin && url.pathname.startsWith('/');
      if (isInternal) start();
    };
    window.addEventListener('click', onClick, true);
    window.addEventListener('popstate', start);
    return () => {
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', start);
    };
  }, []);

  // When the new route has committed (pathname/search changed), finish
  useEffect(() => {
    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${progress * 100}%`,
        background: '#D25D5D',
        boxShadow: '0 0 6px rgba(210,93,93,0.5)',
        transition: 'width 150ms ease-out, opacity 200ms ease-out',
        opacity: progress > 0 && progress < 1 ? 1 : progress === 1 ? 0 : 0,
        zIndex: 9999,
      }}
    />
  );
}


