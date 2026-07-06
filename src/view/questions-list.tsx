import { useCallback, useEffect, useState } from 'react';
import { ListItem } from './list-item';
import { NoData } from './no-data';
import { SOQuestion } from '../model/types';
import { useAppSelector } from '../store/store';
import { useClickOutside } from '../hooks/use-click-outside';

export const QuestionsList: React.FC = () => {
  const [items, setItems] = useState<SOQuestion[]>([]);
  const { items: storeItems, status, error } = useAppSelector((state) => state.questions);
  const [openedId, setOpenedId] = useState<number | null>(null);
  const containerRef = useClickOutside(() => setOpenedId(null));

  useEffect(() => {
    if (status === 'succeeded') {
      setItems(storeItems);
    }
  }, [status, storeItems]);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevItems) => {
      const item = prevItems[dragIndex];
      return prevItems
        .toSpliced(dragIndex, 1) // вырезать 1 элемент на dragIndex
        .toSpliced(hoverIndex, 0, item); // вставить item на hoverIndex
    });
  }, []);

  if (status === 'idle') return <div>Выберите дату и нажмите "Поиск"</div>;
  if (status === 'loading') return <div>Загрузка...</div>;
  if (status === 'failed') return <div>Ошибка: {error}</div>;
  if (status === 'succeeded' && items.length === 0) return <NoData />;

  return items.length === 0 ? (
    <NoData />
  ) : (
    <div ref={containerRef}>
      {items.map((item, index) => (
        <ListItem
          key={item.question_id}
          itemId={item.question_id}
          isOpened={item.question_id === openedId}
          position={index}
          question={item}
          onToggle={() =>
            setOpenedId((prev) => (prev === item.question_id ? null : item.question_id))
          }
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};
