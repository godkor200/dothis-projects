'use client';
import { useRouter } from 'next/navigation';
import type { ElementRef, MouseEventHandler } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  children,
  dismissCallback,
}: {
  children: React.ReactNode;
  dismissCallback?: () => void;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    dismissCallback ?? router.back();
  }, [router, dismissCallback]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    document.addEventListener('keydown', onKeyDown);
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return createPortal(
    <div
      ref={overlay}
      className="bg-grey300 fixed inset-0 z-[98] mx-auto bg-opacity-10"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6"
      >
        {children}
      </div>
    </div>,
    document.getElementById('router-modal-root')!,
  );
}
