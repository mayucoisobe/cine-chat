import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';
import { useState } from 'react';

const ques = [
  {
    answer: 'これは文章の一部を分割している例です',
    keywords: ['文章', '一部', '分割'],
  },
  {
    answer: '漢字の部分のみ下線をつけております候',
    keywords: ['漢字', '部分', '下線', '候'],
  },
];

export default function popupTest() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log('クリックされた');
    setIsOpen(!isOpen);
  };

  const addSpans = (str) => {
    const keywords = ques[0].keywords;
    const pattern = new RegExp(keywords.join('|'), 'g');
    const addSpans = str.replace(
      pattern,
      (m) => `<span style="text-decoration: underline;" onClick={handleClick}>${m}</span>`
    );
    console.log(addSpans);
    return <div dangerouslySetInnerHTML={{ __html: addSpans }} />;
  };

  return (
    <>
      <div>popupTest</div>
      {/* <Popover isOpen={isOpen}>
        <PopoverTrigger>
          <Button onClick={handleClick}>{addSpans(ques[0].answer)}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
        </PopoverContent>
      </Popover> */}

      <div>
        <h3>答えは</h3>
        <div>{addSpans(ques[0].answer)}</div>
      </div>
    </>
  );
}
