import { type Identifier, type XYCoord } from 'dnd-core';
import { RefObject, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DRAGGABLE_TYPE = 'card';

interface DragItem {
  index: number;
  id: number;
  type: string;
}

export const useDragAndDrop = (
  position: number,
  itemId: number,
  moveItem: (dragIndex: number, hoverIndex: number) => void
): {
  ref: RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  handlerId: Identifier | null;
} => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: DRAGGABLE_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = position;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: DRAGGABLE_TYPE,
    // Функция фиксирует позицию на момент начала перетаскивания; объект пересоздавался бы при каждом рендере и ломал геометрию.
    item: () => ({ id: itemId, index: position }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return { ref, isDragging, handlerId };
};
