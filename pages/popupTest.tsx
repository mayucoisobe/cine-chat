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
import { color } from 'framer-motion';
import { useState } from 'react';

const ques = [
  { answer: 'これは文章の一部を分割している例です', check01: '文章', check02: '一部', check03: '分割' },
  { answer: '漢字の部分のみ下線をつけております候', check01: '漢字', check02: '部分', check03: '下線', check04: '候' },
];

export default function popupTest() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // 指定した文字列に対して span タグを追加する関数
  const addSpanTags = (str: string) => {
    const parts = str.split(ques[0].check01);
    const parts02 = str.split(ques[0].check02);
    const parts03 = str.split(ques[0].check03);
    // const parts = str.split(new RegExp(`(${ques[0].check}${ques[0].check02})`, 'g'));
    return (
      <>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index !== parts.length - 1 && (
              <>
                <span style={{ color: 'red' }} onClick={handleClick}>
                  {ques[0].check01}
                </span>
              </>
            )}
          </span>
        ))}
        {parts02.map((part, index) => (
          <span key={index}>
            {parts02}
            {index !== parts.length - 1 && (
              <>
                <span style={{ color: 'red' }} onClick={handleClick}>
                  {ques[0].check02}
                </span>
              </>
            )}
          </span>
        ))}
      </>
    );
  };

  return (
    <>
      <div>popupTest</div>
      <Popover isOpen={isOpen} onClose={handleClick}>
        <PopoverTrigger>
          <Button>{addSpanTags(ques[0].answer)}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
