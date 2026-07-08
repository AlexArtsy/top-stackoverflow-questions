import { Alert } from '@mui/material';

export const NoData: React.FC = () => {
  return <Alert severity="warning">По выбранной дате вопросов не найдено</Alert>;
};
