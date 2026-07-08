import { ListItemContent } from './list-item-content';
import { SOQuestion } from '../../model/types';
import { ButtonPannel } from './button-pannel';
import { useDragAndDrop } from '../../hooks/use-drag-and-drop';
import { Box, Collapse, Paper, Typography } from '@mui/material';

interface Props {
  itemId: number;
  itemCount: number;
  isOpened: boolean;
  position: number;
  question: SOQuestion;
  onToggle: () => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export const ListItem: React.FC<Props> = ({
  itemId,
  itemCount,
  isOpened,
  position,
  question,
  onToggle,
  moveItem
}) => {
  const { ref, isDragging, handlerId } = useDragAndDrop(position, itemId, moveItem);

  const onUpClickHandle = (e: React.MouseEvent) => {
    if (position === 0) return;

    e.stopPropagation();
    moveItem(position, position - 1);
  };

  const onDownClickHandle = (e: React.MouseEvent) => {
    if (position === itemCount - 1) return;

    e.stopPropagation();
    moveItem(position, position + 1);
  };

  return (
    <Paper
      ref={ref}
      variant="outlined"
      sx={{
        p: 1.5,
        mb: 1,
        opacity: isDragging ? 0 : 1,
        cursor: 'move',
        ...(question.is_answered && { bgcolor: '#e8f5e9' })
      }}

      data-handler-id={handlerId}
      onClick={onToggle}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">{question.title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <Typography
            variant="subtitle2"
            sx={{
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              minWidth: 32,
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            {question.score}
          </Typography>
          <ButtonPannel
            itemIndex={position}
            itemCount={itemCount}
            onUpClickHandle={onUpClickHandle}
            onDownClickHandle={onDownClickHandle}
          />
        </Box>
      </Box>
      <Collapse in={isOpened}>
        <ListItemContent question={question} />
      </Collapse>
    </Paper>
  );
};
