/** @vitest-environment jsdom */

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useClickOutside } from '../use-click-outside';

describe('useClickOutside', () => {
  it('клик снаружи контейнера вызывает onClose', () => {
    const onClose = vi.fn();

    const { result } = renderHook(() => useClickOutside(onClose));

    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    document.body.append(container);

    // Присваиваем ref элементу (эмуляция того, что делает React в JSX)
    (result.current as React.MutableRefObject<HTMLDivElement | null>).current = container;

    const outside = document.createElement('div');
    document.body.append(outside);

    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(onClose).toHaveBeenCalledOnce();

    container.remove();
    outside.remove();
  });

  it('клик внутри контейнера НЕ вызывает onClose', () => {
    const onClose = vi.fn();

    const { result } = renderHook(() => useClickOutside(onClose));

    const container = document.createElement('div');
    document.body.append(container);

    (result.current as React.MutableRefObject<HTMLDivElement | null>).current = container;

    const inside = document.createElement('span');
    container.append(inside);

    inside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(onClose).not.toHaveBeenCalled();

    container.remove();
  });

  it('после unmount не вызывает onClose при клике снаружи', () => {
    const onClose = vi.fn();

    const { result, unmount } = renderHook(() => useClickOutside(onClose));

    const container = document.createElement('div');
    document.body.append(container);

    (result.current as React.MutableRefObject<HTMLDivElement | null>).current = container;

    unmount();

    const outside = document.createElement('div');
    document.body.append(outside);

    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(onClose).not.toHaveBeenCalled();

    container.remove();
    outside.remove();
  });
});
