/** @vitest-environment jsdom */

import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ScoreControls } from '../score-controls';

describe('ScoreControls', () => {
  it('кнопка + вызывает onUpClickHandle', () => {
    const up = vi.fn();
    const down = vi.fn();

    render(<ScoreControls onUpClickHandle={up} onDownClickHandle={down} />);

    // Кнопки две, первая — AddIcon (+)
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(up).toHaveBeenCalledOnce();
    expect(down).not.toHaveBeenCalled();
  });

  it('кнопка − вызывает onDownClickHandle', () => {
    const up = vi.fn();
    const down = vi.fn();

    render(<ScoreControls onUpClickHandle={up} onDownClickHandle={down} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(down).toHaveBeenCalledOnce();
    expect(up).not.toHaveBeenCalled();
  });

  it('dblclick на кнопках не всплывает', () => {
    const up = vi.fn();
    const down = vi.fn();

    render(<ScoreControls onUpClickHandle={up} onDownClickHandle={down} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.doubleClick(buttons[0]);
    fireEvent.doubleClick(buttons[1]);

    // Обработчики onUpClickHandle/onDownClickHandle не должны вызываться
    expect(up).not.toHaveBeenCalled();
    expect(down).not.toHaveBeenCalled();
  });
});
