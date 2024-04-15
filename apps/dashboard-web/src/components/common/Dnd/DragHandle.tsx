import { useDraggableContext } from './DraggableContext';

interface DragHandleProps {
  index: number;
  dragDivRef?: React.RefObject<HTMLDivElement>;
}

const ICON_MENU = '/icons/hamberger-menu.svg';

const DragHandle = ({ index, dragDivRef }: DragHandleProps) => {
  const { handleDragStart, findItemIndex } = useDraggableContext('DragHandle');
  return (
    <div
      className="h-full cursor-move hover:opacity-80"
      draggable
      onDragStart={(event) => {
        if (dragDivRef?.current) {
          event.dataTransfer.setDragImage(dragDivRef.current, 0, 0);
        }
        handleDragStart(findItemIndex(index));
      }}
    >
      <img className="h-full cursor-move" src={ICON_MENU} />
    </div>
  );
};

export default DragHandle;
