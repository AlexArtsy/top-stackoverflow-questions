import { ListItemContent } from './list-item-content';
import { SOQuestion } from '../../types/question';
import { ScoreControls } from './score-controls';
import { useDragAndDrop } from '../../hooks/use-drag-and-drop';
import { Box, Collapse, Paper, Typography } from '@mui/material';
import { useClickHandler } from '../../hooks/use-click-handler';

const paperSx = (isDragging: boolean, isAnswered: boolean, isSwapSelected: boolean) => ({
  p: 1.5,
  mb: 1,
  cursor: 'move',
  opacity: isDragging ? 0.4 : 1,
  ...(isDragging && { borderStyle: 'dashed' }),
  ...(isAnswered && !isDragging && { bgcolor: '#e8f5e9' }),
  ...(isSwapSelected && { borderColor: 'orange', borderWidth: '2px' })
});

const scoreBadgeSx = {
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 1,
  px: 1,
  py: 0.5,
  minWidth: 32,
  textAlign: 'center',
  fontWeight: 'bold'
};

interface Props {
  item: {
    id: number;
    index: number;
    question: SOQuestion;
    isOpened: boolean;
    isSwapSelected: boolean;
  };
  onToggle: (id: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onChangeScore: (questionId: number, delta: number) => void;
  onDoubleClick: (questionId: number) => void;
}

export const ListItem: React.FC<Props> = ({
  item: { id, index, question, isOpened, isSwapSelected },
  onToggle,
  moveItem,
  onChangeScore,
  onDoubleClick
}) => {
  const { ref, isDragging, handlerId } = useDragAndDrop(index, id, moveItem);
  const { handleClick, handleDoubleClick } = useClickHandler(
    () => onToggle(id),
    () => onDoubleClick(id)
  );

  const onUpClickHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChangeScore(id, 1);
  };

  const onDownClickHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChangeScore(id, -1);
  };

  return (
    <Paper
      ref={ref}
      variant="outlined"
      sx={paperSx(isDragging, question.is_answered, isSwapSelected)}
      data-handler-id={handlerId}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">{question.title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <Typography variant="subtitle2" sx={scoreBadgeSx}>
            {question.score}
          </Typography>
          <ScoreControls onUpClickHandle={onUpClickHandle} onDownClickHandle={onDownClickHandle} />
        </Box>
      </Box>
      <Collapse in={isOpened}>
        <ListItemContent question={question} />
      </Collapse>
    </Paper>
  );
};
