import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { changeScore } from '../store/question-slice';
import { fetchQuestions } from '../api/fetch-questions';
import type { SOQuestion } from '../model/types';

export function useQuestionsList() {
  const dispatch = useAppDispatch();
  const { items: storeItems, status, error, fromDate } = useAppSelector(s => s.questions);
  const [items, setItems] = useState<SOQuestion[]>([]);

  // Синхронизация при новом ответе API
  useEffect(() => {
    if (status === 'succeeded') setItems(storeItems);
  }, [status]);

  // Авто-запрос при первом монтировании
  useEffect(() => {
    dispatch(fetchQuestions(fromDate));
  }, []); // eslint-disable-line

  // Score ±1 — Redux + локальный
  const scoreChangeHandler = useCallback((questionId: number, delta: number) => {
    dispatch(changeScore({ questionId, delta }));
    setItems(prev =>
      prev.map(q => q.question_id === questionId ? { ...q, score: q.score + delta } : q)
    );
  }, [dispatch]);

  // DnD — перестановка
  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems(prev => {
      const item = prev[dragIndex];
      return prev.toSpliced(dragIndex, 1).toSpliced(hoverIndex, 0, item);
    });
  }, []);

  // Double-click swap
  const swapItems = useCallback((a: number, b: number) => {
    setItems(prev => {
      const next = [...prev];
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
  }, []);

  return { items, status, error, scoreChangeHandler, moveItem, swapItems };
}