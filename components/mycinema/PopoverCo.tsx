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
import { AddIcon } from '@chakra-ui/icons';

export const PopoverCo = ({ props }: JSX.Element) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button>
            <AddIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Please Note!</PopoverHeader>
          <PopoverBody>
            <span>マイルームに追加するにはログインが必要です！</span>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
