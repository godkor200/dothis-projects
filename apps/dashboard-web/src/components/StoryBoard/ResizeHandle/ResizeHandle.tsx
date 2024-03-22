import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

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
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(sidebarWidth);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // text selection과 같은 onDrag 이벤트 중지
      e.preventDefault();
      // 최대/최소 너비를 지정
      const widthChange = Math.min(startWidth + startX - e.clientX, 1460);
      setSidebarWidth(Math.max(320, widthChange));
    };

    const handleMouseUp = () => {
      console.log('handleMouseUp');
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, sidebarWidth, startWidth, startX]);

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
