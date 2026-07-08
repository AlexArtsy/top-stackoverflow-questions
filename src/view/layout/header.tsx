import { Box, Divider, Typography } from '@mui/material';
import { SEARCH_PHRASE } from '../../constants';
import { DatePicker } from '../search/date-picker';
import { SearchButton } from '../search/button';

const headerRowSx = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 1,
  mb: 2,
};

const headerTitleSx = {
  flex: '1 1 auto',
  minWidth: 200,
};

const controlsRowSx = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
  flexShrink: 0,
};

export const Header: React.FC = () => {
  return (
    <div>
      <Box sx={headerRowSx}>
        <Typography variant="h5" sx={headerTitleSx}>
          5 самых популярных вопросов на StackoverFlow, содержащих "{SEARCH_PHRASE}" в наименовании,
          начиная с
        </Typography>
        <Box sx={controlsRowSx}>
          <DatePicker />
          <SearchButton />
        </Box>
      </Box>
      <Divider />
    </div>
  );
};
