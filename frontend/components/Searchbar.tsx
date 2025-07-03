import { debounce } from 'lodash';

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
      <input
        type="text"
        placeholder="Search factories..."
        onChange={handleChange}
      />
    </div>
  );
};
