import { Box, Link, Typography } from '@mui/material';
import { SOQuestion } from '../../types/question';

interface Props {
  question: SOQuestion;
}

const formatDate = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

export const ListItemContent: React.FC<Props> = ({ question }) => (
  <Box sx={{ mt: 1 }}>
    <Typography variant="body2">Автор: {question.owner.display_name}</Typography>
    <Typography variant="body2">Репутация: {question.owner.reputation}</Typography>
    <Typography variant="body2">Просмотры: {question.view_count}</Typography>
    <Typography variant="body2">
      Последняя активность: {formatDate(question.last_activity_date)}
    </Typography>
    <Typography variant="body2">Рейтинг: {question.score}</Typography>
    <Link href={question.link} target="_blank" rel="noopener noreferrer">
      Открыть на StackOverflow
    </Link>
  </Box>
);
