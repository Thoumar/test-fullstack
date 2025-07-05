import { IconButton, InputBase } from '@mui/material';
import { debounce } from 'lodash';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

type SearchbarProps = {
  onSearch: (value: string) => void;
};

export const Searchbar = ({ onSearch }: SearchbarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const call = debounce(() => onSearch(event.target.value), 500);
    call();
  };

  return (
    <div className="searchbar">
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search factories..."
        inputProps={{ 'aria-label': 'search factories' }}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchRoundedIcon />
      </IconButton>
    </div>
  );
};
