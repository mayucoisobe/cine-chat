import { useState } from 'react';
import { Select } from '@chakra-ui/react';

export const Search = ({ search }): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectOption, setSelectOption] = useState<string>('option1');

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
    <>
      <Select variant="flushed">
        <option value="option1">Movies</option>
        <option value="option2">TV shows</option>
      </Select>
      <form>
        <input value={searchValue} onChange={searchInputChanges} type="text" placeholder="タイトルを入力" />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    </>
  );
};
