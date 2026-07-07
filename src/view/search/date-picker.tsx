import { useAppDispatch, useAppSelector } from '../../store/store';
import { setFromDate } from '../../store/question-slice';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const DatePicker: React.FC = () => {
  const fromDate = useAppSelector((state) => state.questions.fromDate);
  const dispatch = useAppDispatch();

  const selectedDate = fromDate > 0 ? new Date(fromDate * 1000) : null;

  const handleChange = (date: Date | null) => {
    dispatch(setFromDate(date ? Math.floor(date.getTime() / 1000) : 0));
  };

  return <ReactDatePicker selected={selectedDate} onChange={handleChange} />;
};
