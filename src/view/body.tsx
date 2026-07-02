import { HTML5Backend } from 'react-dnd-html5-backend';
import { QuestionsList } from './questions-list';
import { DndProvider } from 'react-dnd';

export const Body: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <QuestionsList />
    </DndProvider>
  );
};
