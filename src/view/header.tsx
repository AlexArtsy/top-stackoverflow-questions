import { DatePicker } from './date-picker';
import { SearchButton } from './search-button';

export const Header: React.FC = () => {
  return (
    <div>
      <h1>
        5 самых популярных вопросов на StackoverFlow, содержащих "react-redux" в наименовании,
        начиная с
      </h1>
      <DatePicker />
      <SearchButton />
      <hr />
    </div>
  );
};
