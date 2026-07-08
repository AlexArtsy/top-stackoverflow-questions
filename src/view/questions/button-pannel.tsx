import { Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
  itemIndex: number;
  itemCount: number;
  onUpClickHandle: (e: React.MouseEvent) => void;
  onDownClickHandle: (e: React.MouseEvent) => void;
}
export const ButtonPannel: React.FC<Props> = ({
  itemIndex,
  itemCount,
  onUpClickHandle,
  onDownClickHandle
}) => {
  return (
    <Box sx={{ display: 'flex', flexShrink: 0 }}>
      <IconButton disabled={itemIndex === 0} onClick={onUpClickHandle} size="small">
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton disabled={itemIndex === itemCount - 1} onClick={onDownClickHandle} size="small">
        <ArrowDownwardIcon />
      </IconButton>
    </Box>
  );
};
