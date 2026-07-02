import { useCallback, useState } from 'react';
import { ListItem } from './list-item';
import { NoData } from './no-data';
import update from 'immutability-helper';
import { SOQuestion } from '../model/types';

const listData: SOQuestion[] = [
  { id: 0, text: 'вопрос 1' },
  { id: 1, text: 'вопрос 2' },
  { id: 2, text: 'вопрос 3' },
  { id: 3, text: 'вопрос 4' },
  { id: 4, text: 'вопрос 5' },
];

export const QuestionsList: React.FC = () => {
  const [items, setItems] = useState<SOQuestion[]>(listData);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevItems: SOQuestion[]) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex] as SOQuestion],
        ],
      }),
    );
  }, []);

  return items.length === 0 ? (
    <NoData />
  ) : (
    <div>
      {items.map((item, index) => (
        <ListItem key={item.id} id={item.id} index={index} question={item} moveItem={moveItem} />
      ))}
    </div>
  );
};
