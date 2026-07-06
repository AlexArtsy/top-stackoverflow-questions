import { SOQuestion } from "../model/types";

interface Props {
  question: SOQuestion;
}

const formatDate = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });


export const ListItemContent: React.FC<Props> = ({ question }) => (
  <div>
    <div>Автор: {question.owner.display_name}</div>
    <div>Репутация: {question.owner.reputation}</div>
    <div>Просмотры: {question.view_count}</div>
    <div>Последняя активность: {formatDate(question.last_activity_date)}</div>
    <div dangerouslySetInnerHTML={{ __html: question.body }} />
  </div>
);
