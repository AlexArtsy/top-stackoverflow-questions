import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const controlsWrapperSx = {
  display: 'flex',
  flexShrink: 0,
};

interface Props {
  onUpClickHandle: (e: React.MouseEvent) => void;
  onDownClickHandle: (e: React.MouseEvent) => void;
}
export const ScoreControls: React.FC<Props> = ({
  onUpClickHandle,
  onDownClickHandle
}) => {
  return (
    <Box sx={controlsWrapperSx} onDoubleClick={(e) => e.stopPropagation()}>
      <IconButton onClick={onUpClickHandle} size="small">
        <AddIcon />
      </IconButton>
      <IconButton onClick={onDownClickHandle} size="small">
        <RemoveIcon />
      </IconButton>
    </Box>
  );
};
