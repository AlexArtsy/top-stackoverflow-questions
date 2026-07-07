import { ListItemContent } from './list-item-content';
import { ITEM_COUNT, SOQuestion } from '../model/types';
import { ButtonPannel } from './button-pannel';
import { useDragAndDrop } from '../hooks/use-drag-and-drop';

// TODO: на первое время
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

interface Props {
  itemId: number;
  isOpened: boolean;
  position: number;
  question: SOQuestion;
  onToggle: () => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export const ListItem: React.FC<Props> = ({
  itemId,
  isOpened,
  position: index,
  question,
  onToggle,
  moveItem
}) => {
  const { ref, isDragging, handlerId } = useDragAndDrop(index, itemId, moveItem);

  const onUpClickHandle = (e: React.MouseEvent) => {
    if (index === 0) return;

    e.stopPropagation();
    moveItem(index, index - 1);
  };

  const onDownClickHandle = (e: React.MouseEvent) => {
    if (index === ITEM_COUNT - 1) return;

    e.stopPropagation();
    moveItem(index, index + 1);
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
      onClick={onToggle}
    >
      <div>
        {question.title}
        <ButtonPannel
          itemIndex={index}
          onUpClickHandle={onUpClickHandle}
          onDownClickHandle={onDownClickHandle}
        />
      </div>
      {isOpened && <ListItemContent question={question} />}
    </div>
  );
};
