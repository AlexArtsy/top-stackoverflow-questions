/** @vitest-environment jsdom */

import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from '../../../store/question-slice';
import { SearchButton } from '../button';
import type { RootState } from '../../../store/store';

function renderWithProvider(preloadedState: Partial<RootState>) {
  const store = configureStore({
    reducer: { questions: questionsReducer },
    preloadedState,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <SearchButton />
      </Provider>,
    ),
  };
}

const initial = {
  fromDate: 100,
  lastFetchedDate: 0,
  status: 'idle',
} as const;

describe('SearchButton', () => {
  it('показывает кнопку когда дата не совпадает с последней загруженной', () => {
    renderWithProvider({
      questions: {
        ...initial,
        items: [],
        error: null,
      } as RootState['questions'],
    });

    expect(screen.getByRole('button', { name: 'Поиск' })).toBeInTheDocument();
  });

  it('скрывает кнопку когда дата совпадает и статус не loading', () => {
    renderWithProvider({
      questions: {
        ...initial,
        fromDate: 100,
        lastFetchedDate: 100,
        status: 'succeeded',
        items: [],
        error: null,
      } as RootState['questions'],
    });

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('показывает кнопку в состоянии loading даже при совпадении даты', () => {
    renderWithProvider({
      questions: {
        ...initial,
        fromDate: 100,
        lastFetchedDate: 100,
        status: 'loading',
        items: [],
        error: null,
      } as RootState['questions'],
    });

    expect(screen.getByRole('button', { name: 'Поиск' })).toBeInTheDocument();
  });
});
