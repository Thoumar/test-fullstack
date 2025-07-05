import { debounce } from 'lodash';

import { IconButton, InputBase, Paper } from '@mui/material';
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
    <Paper
      className="searchbar"
      elevation={0}
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderRadius: 1,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search factories..."
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchRoundedIcon />
      </IconButton>
    </Paper>
  );
};
