import { useCallback, useState } from 'react';
import { ListItem } from './list-item';
import { NoData } from './no-data';
import { useClickOutside } from '../../hooks/use-click-outside';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useDoubleClickSwap } from '../../hooks/use-double-click-swap';
import { useQuestionsState } from '../../hooks/use-questions-state';
import { useAppDispatch } from '../../store/store';
import { changeScore } from '../../store/question-slice';

const loadingBoxSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 2
};

export const QuestionsList: React.FC = () => {
  const [openedId, setOpenedId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { items, status, error, setItems } = useQuestionsState();

  const handleToggle = useCallback(
    (questionId: number) => {
      setOpenedId((prev) => (prev === questionId ? null : questionId));
    },
    [setOpenedId]
  );

  const handleChangeScore = useCallback(
    (questionId: number, delta: number) => {
      dispatch(changeScore({ questionId, delta }));
      setItems((prev) =>
        prev.map((q) => (q.question_id === questionId ? { ...q, score: q.score + delta } : q))
      );
    },
    [dispatch, setItems]
  );

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setItems((prev) => {
        const item = prev[dragIndex];
        return prev.toSpliced(dragIndex, 1).toSpliced(hoverIndex, 0, item);
      });
    },
    [setItems]
  );

  const swapItems = useCallback(
    (a: number, b: number) => {
      setItems((prev) => {
        const next = [...prev];
        [next[a], next[b]] = [next[b], next[a]];
        return next;
      });
    },
    [setItems]
  );

  const { selectedId, handleDoubleClick, clearSelection } = useDoubleClickSwap(
    items,
    (item) => item.question_id,
    swapItems
  );

  const containerRef = useClickOutside(() => {
    setOpenedId(null);
    clearSelection();
  });

  if (status === 'loading') {
    return (
      <Box sx={loadingBoxSx}>
        <CircularProgress size={24} />
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }
  if (status === 'failed') {
    return <Alert severity="error">Ошибка: {error}</Alert>;
  }

  return items.length === 0 ? (
    <NoData />
  ) : (
    <div ref={containerRef}>
      {items.map((question, index) => (
        <ListItem
          key={question.question_id}
          item={{
            id: question.question_id,
            index,
            question,
            isOpened: question.question_id === openedId,
            isSwapSelected: question.question_id === selectedId
          }}
          onToggle={handleToggle}
          moveItem={moveItem}
          onChangeScore={handleChangeScore}
          onDoubleClick={handleDoubleClick}
        />
      ))}
    </div>
  );
};
