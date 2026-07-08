import { useCallback, useEffect, useState } from 'react';
import { ListItem } from './list-item';
import { NoData } from './no-data';
import { SOQuestion } from '../../model/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useClickOutside } from '../../hooks/use-click-outside';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { changeScore } from '../../store/question-slice';
import { fetchQuestions } from '../../api/fetch-questions';
import { useDoubleClickSwap } from '../../hooks/use-double-click-swap';

export const QuestionsList: React.FC = () => {
  const [items, setItems] = useState<SOQuestion[]>([]);
  const { items: storeItems, status, error, fromDate } = useAppSelector((state) => state.questions);
  const [openedId, setOpenedId] = useState<number | null>(null);
  const containerRef = useClickOutside(() => {
    setOpenedId(null);
    clearSelection();
  });
  const { swapItemId, handleDoubleClick, clearSelection } = useDoubleClickSwap(items, setItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuestions(fromDate));
    }
  }, [status, fromDate, dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setItems(storeItems);
    }
  }, [status]);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevItems) => {
      const item = prevItems[dragIndex];
      return prevItems
        .toSpliced(dragIndex, 1) // вырезать 1 элемент на dragIndex
        .toSpliced(hoverIndex, 0, item); // вставить item на hoverIndex
    });
  }, []);

  const handleChangeScore = (questionId: number, delta: number) => {
    dispatch(changeScore({ questionId, delta }));
    setItems((prev) =>
      prev.map((q) => (q.question_id === questionId ? { ...q, score: q.score + delta } : q))
    );
  };

  if (status === 'idle') {
    return <Alert severity="info">Выберите дату и нажмите "Поиск"</Alert>;
  }
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
      {items.map((item, index) => (
        <ListItem
          key={item.question_id}
          itemId={item.question_id}
          itemCount={items.length}
          isOpened={item.question_id === openedId}
          position={index}
          question={item}
          onToggle={() =>
            setOpenedId((prev) => (prev === item.question_id ? null : item.question_id))
          }
          moveItem={moveItem}
          onChangeScore={handleChangeScore}
          isSwapSelected={item.question_id === swapItemId}
          onDoubleClick={handleDoubleClick}
        />
      ))}
    </div>
  );
};
