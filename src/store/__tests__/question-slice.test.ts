import { describe, expect, it } from 'vitest';
import reducer, { changeScore, setFromDate } from '../question-slice';
import { fetchQuestions } from '../../api/fetch-questions';
import type { SOQuestion } from '../../types/question';

const question = (id: number, score: number): SOQuestion => ({
  question_id: id,
  title: 'Test Question',
  link: `https://example.com/q/${id}`,
  score,
  body: '<p>body</p>',
  owner: { display_name: 'User', reputation: 100 },
  view_count: 500,
  last_activity_date: 1700000000,
  is_answered: false
});

const q1 = question(1, 5);
const q2 = question(2, 10);
const q3 = question(3, 3);

describe('question-slice', () => {
  describe('setFromDate', () => {
    it('меняет fromDate на переданное значение', () => {
      const state = reducer({ fromDate: 100 } as ReturnType<typeof reducer>, setFromDate(200));
      expect(state.fromDate).toBe(200);
    });
  });

  describe('changeScore', () => {
    it('увеличивает score на 1', () => {
      const state = reducer(
        { items: [q1, q2] } as ReturnType<typeof reducer>,
        changeScore({ questionId: 1, delta: 1 })
      );
      expect(state.items[0].score).toBe(6);
      expect(state.items[1].score).toBe(10);
    });

    it('уменьшает score на 1', () => {
      const state = reducer(
        { items: [q1, q2] } as ReturnType<typeof reducer>,
        changeScore({ questionId: 2, delta: -1 })
      );
      expect(state.items[1].score).toBe(9);
    });

    it('не падает при несуществующем question_id', () => {
      const state = reducer(
        { items: [q1] } as ReturnType<typeof reducer>,
        changeScore({ questionId: 999, delta: 1 })
      );
      expect(state.items[0].score).toBe(5);
    });
  });

  describe('fetchQuestions extraReducers', () => {
    it('pending — переводит статус в loading и сбрасывает ошибку', () => {
      const state = reducer(
        { status: 'idle', error: 'старая ошибка' } as ReturnType<typeof reducer>,
        { type: fetchQuestions.pending.type }
      );
      expect(state.status).toBe('loading');
      expect(state.error).toBeNull();
    });

    it('fulfilled — записывает данные и ставит статус succeeded', () => {
      const items = [q1, q2, q3];
      const state = reducer(
        { status: 'loading', fromDate: 123, lastFetchedDate: 0 } as ReturnType<typeof reducer>,
        fetchQuestions.fulfilled(items, '', 123)
      );
      expect(state.status).toBe('succeeded');
      expect(state.items).toEqual(items);
      expect(state.lastFetchedDate).toBe(123);
    });

    it('rejected — ставит статус failed и записывает ошибку', () => {
      const state = reducer(
        { status: 'loading' } as ReturnType<typeof reducer>,
        fetchQuestions.rejected(new Error('сетевая ошибка'), '', 0, 'сетевая ошибка')
      );
      expect(state.status).toBe('failed');
      expect(state.error).toBe('сетевая ошибка');
    });
  });
});
