import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchQuestions } from '../../api/fetch-questions';
import { Button } from '@mui/material';

export const SearchButton: React.FC = () => {
  const { fromDate, status } = useAppSelector((state) => state.questions);
  const dispatch = useAppDispatch();
  const isLoading = status === 'loading';

  const onClickHandle = () => {
    dispatch(fetchQuestions(fromDate));
  };

  return (
    <Button variant="contained" loading={isLoading} onClick={onClickHandle}>
      Поиск
    </Button>
  );
};
