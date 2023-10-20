'use client';
import { useRouter } from 'next/navigation';
import type { MouseEventHandler } from 'react';
import { useCallback, useEffect, useRef } from 'react';

export default function TermsModal({
  children,
  setOnError,
}: {
  children: React.ReactNode;
  setOnError: (trigger: boolean) => void;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    setOnError(false);
  }, [router]);

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
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="bg-grey300 fixed inset-0 z-10 mx-auto bg-opacity-80"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 p-6"
      >
        {children}
      </div>
    </div>
  );
}
