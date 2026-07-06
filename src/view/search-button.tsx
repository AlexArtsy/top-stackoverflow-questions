import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchQuestions } from '../api/fetch-questions';

export const SearchButton: React.FC = () => {
  const { fromDate, status } = useAppSelector((state) => state.questions);
  const dispatch = useAppDispatch();
  const isLoading = status === 'loading';

  const onClickHandle = () => {
    dispatch(fetchQuestions(fromDate));
  };

  return (
    <div>
      <button disabled={isLoading} onClick={onClickHandle}>
        {isLoading ? 'Загрузка...' : 'Поиск'}
      </button>
    </div>
  );
};
