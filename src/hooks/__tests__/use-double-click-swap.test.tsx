/** @vitest-environment jsdom */

import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useDoubleClickSwap } from '../use-double-click-swap';

interface Item {
  id: number;
  name: string;
}

describe('useDoubleClickSwap', () => {
  // Arrange — общие данные для всех тестов
  const items: Item[] = [
    { id: 10, name: 'A' },
    { id: 20, name: 'B' },
    { id: 30, name: 'C' },
  ];
  const getId = (item: Item) => item.id;
  const onSwap = vi.fn();

  it('первый двойной клик выделяет элемент', () => {
    onSwap.mockClear();

    const { result } = renderHook(() => useDoubleClickSwap(items, getId, onSwap));

    act(() => result.current.handleDoubleClick(10));

    expect(result.current.selectedId).toBe(10);
    expect(onSwap).not.toHaveBeenCalled();
  });

  it('повторный двойной клик по тому же элементу снимает выделение', () => {
    onSwap.mockClear();

    const { result } = renderHook(() => useDoubleClickSwap(items, getId, onSwap));

    act(() => result.current.handleDoubleClick(10));
    act(() => result.current.handleDoubleClick(10));

    expect(result.current.selectedId).toBeNull();
    expect(onSwap).not.toHaveBeenCalled();
  });

  it('двойной клик по другому элементу — swap и сброс', () => {
    onSwap.mockClear();

    const { result } = renderHook(() => useDoubleClickSwap(items, getId, onSwap));

    act(() => result.current.handleDoubleClick(10));
    act(() => result.current.handleDoubleClick(30));

    expect(result.current.selectedId).toBeNull();
    expect(onSwap).toHaveBeenCalledOnce();
    expect(onSwap).toHaveBeenCalledWith(0, 2); // A (index 0) <-> C (index 2)
  });

  it('clearSelection сбрасывает выделение без обмена', () => {
    onSwap.mockClear();

    const { result } = renderHook(() => useDoubleClickSwap(items, getId, onSwap));

    act(() => result.current.handleDoubleClick(10));
    act(() => result.current.clearSelection());

    expect(result.current.selectedId).toBeNull();
    expect(onSwap).not.toHaveBeenCalled();
  });
});
