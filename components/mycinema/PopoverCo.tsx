import Image from 'next/image';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from '@chakra-ui/react';

export const PopoverCo = (): JSX.Element => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button width="55px" height="55px" p="8px" colorScheme="gray">
            <Image width={45} height={45} alt="cinemaadd" src="/film-add.svg"></Image>
          </Button>
        </PopoverTrigger>
        <PopoverContent w="270px" ml={2}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader color="brand.100">未ログインの方はここまで！</PopoverHeader>
          <PopoverBody color="brand.100">
            <span>マイルームに追加するにはログインしてください!</span>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
