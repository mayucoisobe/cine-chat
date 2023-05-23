import { useState } from 'react';
import { Flex, FormControl, IconButton, Input, Select, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const SearchBar = ({ search }): JSX.Element => {
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
      <Text>movies or tv shows?</Text>
      <Select value={selectedOption} onChange={handleSelectChange}>
        <option value="option1">Movies</option>
        <option value="option2">TV shows</option>
      </Select>
      <form>
        <Flex>
          <Input
            value={searchValue}
            onChange={handleInputChange}
            type="text"
            placeholder="タイトルを入力"
            variant="flushed"
            focusBorderColor="pink.400"
          />
          <IconButton onClick={callSearchFunction} type="submit" icon={<SearchIcon />} aria-label="Search database" />
        </Flex>
      </form>
    </>
  );
};