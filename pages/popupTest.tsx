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
import { useEffect, useState } from 'react';

const check = () => {
  console.log('押された！');
};
const check02 = () => {
  console.log('02押された！');
};

const handleClick = () => {
  alert('押されました！');
};

// const ques = [
//   {
//     answer: (
//       <p>
//         これは
//         <span onClick={handleClick}>文章</span>の
//         <span onClick={handleClick}>一部</span>
//         を分割している例です
//       </p>
//     ),
//     keywords: ['文章', '一部', '分割'],
//   },
//   {
//     answer: '漢字の部分のみ下線をつけております候',
//     keywords: ['漢字', '部分', '下線', '候'],
//   },
// ];

const ques = [
  {
    answer: 'これは文章の一部を分割している例です',
    keywords: ['文'],
  },
  {
    answer: '漢字の部分のみ下線をつけております候',
    keywords: ['漢字', '部分', '下線', '候'],
  },
];

// const handleClick () => {
//   console.log('押されました')
// }

export default function popupTest() {
  const [isOpen, setIsOpen] = useState(false);

  // const handleClick = () => {
  //   console.log('クリックされた');
  //   setIsOpen(!isOpen);
  // };

  // const handleClick = () => {
  //   console.log('クリックされた');
  //   setIsOpen(!isOpen);
  // };

  const addSpans = (str) => {
    const keywords = ques[1].keywords;
    const pattern = new RegExp(keywords.join('|'), 'g');
    const addSpans = str.replace(
      pattern,
      (m) =>
        `<span style="text-decoration: underline;" onClick={handleClick}>${m}</span>`
    );
    console.log(addSpans);
    // console.log(henkan);
    return <div dangerouslySetInnerHTML={{ __html: addSpans }} />;
  };

  const henkan = addSpans(ques[1].answer);
  const henkan02 = ques[1].answer;
  console.log(henkan);

  const handleClick = (keyword) => {
    console.log('クリックされたキーワード:', keyword);
    // 必要な処理を実行する
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
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      </Popover> */}

      <div>
        <h3>答えは</h3>
        <div>{addSpans(ques[1].answer)}</div>
        {/* addSpans(ques[0].answer) */}
        {/* {/* <div>{ques[0].answer}</div> */}
        {/* <div>{ques[0].answer}</div>
        {henkan}
        {henkan02} */}
        {/* <div>
          {ques[0].answer.split(' ').map((word, index) => {
            const keyword = ques[0].keywords.find((kw) => kw === word);
            if (keyword) {
              return (
                <span
                  key={index}
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => handleClick(keyword)}
                >
                  {word}
                </span>
              );
            } else {
              return <span key={index}>{word} </span>;
            }
          })}
        </div> */}
      </div>
    </>
  );
}
