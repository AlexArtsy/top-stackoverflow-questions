import { useState } from 'react';
import { ListItem } from './list-item';
import { NoData } from './no-data';
import { useClickOutside } from '../../hooks/use-click-outside';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useDoubleClickSwap } from '../../hooks/use-double-click-swap';
import { useQuestionsList } from '../../hooks/use-questions-list';

const loadingBoxSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

export const QuestionsList: React.FC = () => {
  const [openedId, setOpenedId] = useState<number | null>(null);
  const { items, status, error, scoreChangeHandler, moveItem, swapItems } = useQuestionsList();
  const { selectedId, handleDoubleClick, clearSelection } = useDoubleClickSwap(items, (item) => item.question_id, swapItems);

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
      {items.map((item, index) => (
        <ListItem
          key={item.question_id}
          itemId={item.question_id}
          isOpened={item.question_id === openedId}
          position={index}
          question={item}
          onToggle={() =>
            setOpenedId((prev) => (prev === item.question_id ? null : item.question_id))
          }
          moveItem={moveItem}
          onChangeScore={scoreChangeHandler}
          isSwapSelected={item.question_id === selectedId}
          onDoubleClick={handleDoubleClick}
        />
      ))}
    </div>
  );
};
