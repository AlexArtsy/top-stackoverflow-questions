import { Box, Divider, Typography } from '@mui/material';
import { SEARCH_PHRASE } from '../../config';
import { DatePicker } from '../search/date-picker';
import { SearchButton } from '../search/search-button';

export const Header: React.FC = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h5" sx={{ flex: '1 1 auto', minWidth: '200px' }}>
          5 самых популярных вопросов на StackoverFlow, содержащих "{SEARCH_PHRASE}" в наименовании,
          начиная с
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexShrink: 0 }}>
          <DatePicker />
          <SearchButton />
        </Box>
      </Box>
      <Divider />
    </div>
  );
};
