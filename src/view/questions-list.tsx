import { useCallback, useEffect, useState } from 'react';
import { ListItem } from './list-item';
import { NoData } from './no-data';
import update from 'immutability-helper';
import { SOQuestion } from '../model/types';
import { useAppSelector } from '../store/store';

export const QuestionsList: React.FC = () => {
  const [items, setItems] = useState<SOQuestion[]>([]);
  const { items: storeItems, status, error } = useAppSelector((state) => state.questions);

  useEffect(() => {
    if (status === 'succeeded') {
      setItems(storeItems);
    }
  }, [status, storeItems]);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevItems: SOQuestion[]) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex] as SOQuestion]
        ]
      })
    );
  }, []);

  if (status === 'idle') return <div>Выберите дату и нажмите "Поиск"</div>;
  if (status === 'loading') return <div>Загрузка...</div>;
  if (status === 'failed') return <div>Ошибка: {error}</div>;
  if (status === 'succeeded' && items.length === 0) return <NoData />;

  return items.length === 0 ? (
    <NoData />
  ) : (
    <div>
      {items.map((item, index) => (
        <ListItem
          key={item.question_id}
          id={item.question_id}
          index={index}
          question={item}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};
