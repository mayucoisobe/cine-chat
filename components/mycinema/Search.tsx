import { useState } from 'react';

export const Search = ({ search }): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');

  const searchInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const resetInputArea = () => {
    setSearchValue('');
  };

  const callSearchFunction = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    search(searchValue);
    resetInputArea();
  };

  return (
    <form>
      <input value={searchValue} onChange={searchInputChanges} type="text" />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};
