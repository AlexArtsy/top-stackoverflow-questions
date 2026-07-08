/** @vitest-environment jsdom */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NoData } from '../no-data';

describe('NoData', () => {
  it('рендерит сообщение о том что вопросы не найдены', () => {
    render(<NoData />);
    expect(
      screen.getByText('По выбранной дате вопросов не найдено'),
    ).toBeInTheDocument();
  });
});
