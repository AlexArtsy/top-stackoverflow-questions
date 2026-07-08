import { useState } from 'react';

export function useDoubleClickSwap<T>(
  items: T[],
  getId: (item: T) => number,
  onSwap: (fromIndex: number, toIndex: number) => void,
) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDoubleClick = (id: number) => {
    if (selectedId === null) {
      setSelectedId(id);
    } else if (selectedId === id) {
      setSelectedId(null);
    } else {
      const fromIndex = items.findIndex((item) => getId(item) === selectedId);
      const toIndex = items.findIndex((item) => getId(item) === id);
      onSwap(fromIndex, toIndex);
      setSelectedId(null);
    }
  };

  return { selectedId, handleDoubleClick, clearSelection: () => setSelectedId(null) };
}
