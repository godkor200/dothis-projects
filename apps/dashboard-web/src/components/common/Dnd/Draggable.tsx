import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';

import { useDraggableContext } from './DraggableContext';

interface DraggableProps {
  children: React.ReactNode;
  handle?: boolean;
  layout?: 'row' | 'col';
  className?: string;
  style?: React.CSSProperties;
}

const Draggable = ({
  children,
  handle = false,
  layout = 'col',
  className,
  style,
}: DraggableProps) => {
  const {
    draggableItems,
    setDraggableItems,
    draggingIndex,
    dragOverIndex,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
  } = useDraggableContext('Draggable');

  useEffect(() => {
    setDraggableItems(() => {
      const count = React.Children.count(children);
      return Array.from({ length: count }, (_, index) => index);
    });
  }, [children]);

  const childRecord: Record<number, React.ReactNode> = useMemo(() => {
    const record: Record<number, React.ReactNode> = {};
    React.Children.map(children, (child, index) => {
      record[index] = child;
    });
    return record;
  }, [children]);

  return (
    <div
      className={clsx('flex', `flex-${layout}`, className)}
      style={{ transition: 'transform 2s ease', ...style }}
    >
      {draggableItems.map((id, index) => (
        <li
          key={id}
          className={clsx(
            'even:bg-grey200 border-gery500 bg-grey00 select-none list-none gap-1 border-solid',
            !handle && 'hover:bg-grey200 cursor-grab ',
            draggingIndex !== null &&
              index === dragOverIndex &&
              clsx(
                index < draggingIndex && 'border-primary500 border-t-2',
                index > draggingIndex && 'border-primary500 border-b-2',
              ),
          )}
          draggable={!handle}
          onDragStart={() => !handle && handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={() => handleDragEnd()}
          onDragOver={(event) => {
            event.currentTarget.style.cursor = 'grabbing';
            event.preventDefault();
          }}
        >
          {childRecord[id]}
        </li>
      ))}
      <div
        className={clsx(
          'h-1',
          draggableItems.length === dragOverIndex
            ? 'border-primary500 border-t-2'
            : '1px solid black',
        )}
        onDragEnter={() => handleDragEnter(draggableItems.length)}
        onDragEnd={handleDragEnd}
        onDragOver={(event) => {
          event.currentTarget.style.cursor = 'grabbing';
          event.preventDefault();
        }}
      ></div>
    </div>
  );
};

export default Draggable;
