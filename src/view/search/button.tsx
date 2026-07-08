import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchQuestions } from '../../api/fetch-questions';
import { Button } from '@mui/material';

export const SearchButton: React.FC = () => {
  const { fromDate, status, lastFetchedDate } = useAppSelector((state) => state.questions);
  const dispatch = useAppDispatch();
  const isLoading = status === 'loading';

  const onClickHandle = useCallback(() => {
    dispatch(fetchQuestions(fromDate));
  }, [dispatch, fromDate]);

  if (fromDate === lastFetchedDate && status !== 'loading') return null;

  return (
    <Button variant="contained" loading={isLoading} onClick={onClickHandle}>
      Поиск
    </Button>
  );
};
