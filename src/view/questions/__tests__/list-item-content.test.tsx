/** @vitest-environment jsdom */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ListItemContent } from '../list-item-content';
import type { SOQuestion } from '../../../types/question';

const question: SOQuestion = {
  question_id: 1,
  title: 'Test',
  link: 'https://stackoverflow.com/q/1',
  score: 42,
  body: '<p>body</p>',
  owner: { display_name: 'John', reputation: 1500 },
  view_count: 1000,
  last_activity_date: 1700000000,
  is_answered: true
};

describe('ListItemContent', () => {
  it('рендерит все поля вопроса', () => {
    render(<ListItemContent question={question} />);

    expect(screen.getByText('Автор: John')).toBeInTheDocument();
    expect(screen.getByText('Репутация: 1500')).toBeInTheDocument();
    expect(screen.getByText('Просмотры: 1000')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг: 42')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Открыть на StackOverflow' });
    expect(link).toHaveAttribute('href', 'https://stackoverflow.com/q/1');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
