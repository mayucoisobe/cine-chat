import { useState } from 'react';
import { Flex, FormControl, IconButton, Input, Select, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const SearchBar = ({
  search,
}: {
  search: (searchValue: string, selectedOption: string) => void;
}): JSX.Element => {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <Text pt={5}>choose Movies or Tv Shows</Text>
      <Select value={selectedOption} onChange={handleSelectChange} py={5} color="white">
        <option value="option1">Movies</option>
        <option value="option2">TV shows</option>
      </Select>
      <form>
        <Flex gap={4}>
          <Input
            value={searchValue}
            onChange={handleInputChange}
            type="text"
            placeholder="タイトルを入力"
            variant="flushed"
            focusBorderColor="yellow.400"
          />
          <IconButton
            onClick={callSearchFunction}
            type="submit"
            icon={<SearchIcon />}
            aria-label="Search database"
            color="brand.500"
          />
        </Flex>
      </form>
    </>
  );
};
