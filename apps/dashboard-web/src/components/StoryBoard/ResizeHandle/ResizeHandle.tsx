import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ResizeHandleProps {
  sidebarWidth: number;
  setSidebarWidth: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  style?: React.CSSProperties;
}

const ResizeHandle = ({
  sidebarWidth,
  setSidebarWidth,
  className,
  style,
}: ResizeHandleProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const isResizingRef = useRef(false);

  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isResizingRef.current = true;
      setIsResizing(true);

      startX.current = e.clientX;

      startWidth.current = sidebarWidth;
    },
    [sidebarWidth],
  );

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = false;
    setIsResizing(false);

    time.current = { test: time.current.test + 4 };
  }, []);

  const time = useRef({ test: 1 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // text selection과 같은 onDrag 이벤트 중지
    e.preventDefault();
    // 최대/최소 너비를 지정
    const widthChange = Math.min(
      startWidth.current + startX.current - e.clientX,
      1460,
    );

    setSidebarWidth(Math.max(320, widthChange));
  }, []);

  useEffect(() => {
    if (isResizingRef.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      className={clsx('h-screen cursor-ew-resize select-none', className)}
      style={{ right: `${sidebarWidth}px`, ...style }}
      onMouseDown={handleMouseDown}
    >
      <div className="hover:bg-primary100 from-primary100 h-screen w-[20px] bg-gradient-to-l"></div>
    </div>
  );
};

export default ResizeHandle;

function debounceFunction<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
