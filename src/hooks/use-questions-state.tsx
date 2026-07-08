import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchQuestions } from '../api/fetch-questions';
import type { SOQuestion } from '../model/types';

export function useQuestionsState() {
  const dispatch = useAppDispatch();
  const { items: storeItems, status, error, fromDate } = useAppSelector((s) => s.questions);
  const [items, setItems] = useState<SOQuestion[]>([]);

  useEffect(() => {
    dispatch(fetchQuestions(fromDate));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (status === 'succeeded') setItems(storeItems);
  }, [status]);

  return { items, status, error, setItems };
}
