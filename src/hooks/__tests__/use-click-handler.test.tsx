/** @vitest-environment jsdom */

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useClickHandler } from '../use-click-handler';

describe('useClickHandler', () => {
  it('после одиночного клика вызывает onSingleClick через 250ms', () => {
    vi.useFakeTimers();
    const single = vi.fn();
    const double = vi.fn();

    const { result } = renderHook(() => useClickHandler(single, double));

    result.current.handleClick();
    expect(single).not.toHaveBeenCalled();

    vi.advanceTimersByTime(250);
    expect(single).toHaveBeenCalledOnce();
    expect(double).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('при двойном клике вызывает onDoubleClick и отменяет onSingleClick', () => {
    vi.useFakeTimers();
    const single = vi.fn();
    const double = vi.fn();

    const { result } = renderHook(() => useClickHandler(single, double));

    result.current.handleClick();
    result.current.handleDoubleClick();

    vi.advanceTimersByTime(250);
    expect(single).not.toHaveBeenCalled();
    expect(double).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });

  it('при втором клике отменяет предыдущий таймер и ставит новый', () => {
    vi.useFakeTimers();
    const single = vi.fn();
    const double = vi.fn();

    const { result } = renderHook(() => useClickHandler(single, double));

    result.current.handleClick();
    vi.advanceTimersByTime(100);

    result.current.handleClick();
    vi.advanceTimersByTime(250);
    expect(single).toHaveBeenCalledOnce();
    expect(double).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('при размонтировании очищает таймер', () => {
    vi.useFakeTimers();
    const single = vi.fn();
    const double = vi.fn();

    const { result, unmount } = renderHook(() => useClickHandler(single, double));

    result.current.handleClick();
    unmount();
    vi.advanceTimersByTime(250);

    expect(single).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
