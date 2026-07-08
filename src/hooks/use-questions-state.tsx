import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchQuestions } from '../api/fetch-questions';
import type { SOQuestion } from '../types/question';

export function useQuestionsState() {
  const dispatch = useAppDispatch();
  const { items: storeItems, status, error, fromDate } = useAppSelector((s) => s.questions);
  const [items, setItems] = useState<SOQuestion[]>([]);

  useEffect(() => {
    dispatch(fetchQuestions(fromDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  useEffect(() => {
    if (status === 'succeeded') setItems(storeItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync only on new API response, not on score changes
  }, [status]);

  return { items, status, error, setItems };
}
