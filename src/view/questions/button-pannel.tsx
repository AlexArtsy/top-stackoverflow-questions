import { Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
  onUpClickHandle: (e: React.MouseEvent) => void;
  onDownClickHandle: (e: React.MouseEvent) => void;
}
export const ButtonPannel: React.FC<Props> = ({
  onUpClickHandle,
  onDownClickHandle
}) => {
  return (
    <Box sx={{ display: 'flex', flexShrink: 0 }}>
      <IconButton onClick={onUpClickHandle} size="small">
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton onClick={onDownClickHandle} size="small">
        <ArrowDownwardIcon />
      </IconButton>
    </Box>
  );
};
