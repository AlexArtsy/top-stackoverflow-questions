import dayjs from 'dayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setFromDate } from '../../store/question-slice';

export const DatePicker: React.FC = () => {
  const fromDate = useAppSelector((state) => state.questions.fromDate);
  const dispatch = useAppDispatch();

  const value = fromDate > 0 ? dayjs.unix(fromDate) : null;

  return (
    <MuiDatePicker
      label="Начиная с даты"
      value={value}
      onChange={(newValue) => {
        dispatch(setFromDate(newValue ? newValue.unix() : 0));
      }}
    />
  );
};
