import { useAppDispatch, useAppSelector } from '../store/store';
import { setFromDate } from '../store/question-slice';

export const DatePicker: React.FC = () => {
  const fromDate = useAppSelector((state) => state.questions.fromDate);
  const dispatch = useAppDispatch();

  const dateValue = fromDate > 0 ? new Date(fromDate * 1000).toISOString().split('T')[0] : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      dispatch(setFromDate(0));
      return;
    }
    const unix = Math.floor(new Date(value).getTime() / 1000);
    dispatch(setFromDate(unix));
  };

  return (
    <div>
      <input type="date" onChange={handleChange} value={dateValue} />
    </div>
  );
};
