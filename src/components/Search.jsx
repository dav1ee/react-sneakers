import { useContext } from 'react';

import { SearchContext } from '../App';

function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const onClear = () => {
    setSearchValue('');
  };

  return (
    <div className="search">
      <svg className="search__findIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
      </svg>
      <input
        type="text"
        placeholder="Поиск модели..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <svg
          onClick={onClear}
          className="search__clearIcon"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 0 48 48"
          width="48">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
}

export default Search;
