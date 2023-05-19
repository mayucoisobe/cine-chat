import { useState } from 'react';
import { IconButton, Select, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const Search = ({ search }): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('option1');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const resetInputArea = () => {
    setSearchValue('');
  };

  const callSearchFunction = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    search(searchValue, selectedOption);
    resetInputArea();
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        variant="flushed"
      >
        <option value="option1">Movies</option>
        <option value="option2">TV shows</option>
      </Select>
      <form>
        <Input
          value={searchValue}
          onChange={handleInputChange}
          type="text"
          placeholder="タイトルを入力"
          focusBorderColor="pink.400"
        />
        <IconButton
          onClick={callSearchFunction}
          type="submit"
          icon={<SearchIcon />}
          aria-label="Search database"
        />
      </form>
    </>
  );
};

{
  //   <input
  //   value={searchValue}
  //   onChange={searchInputChanges}
  //   type="text"
  //   placeholder="タイトルを入力"
  // />
  /* <input
          onClick={callSearchFunction}
          type="submit"
          value="SEARCH"
        ></input> */
}
