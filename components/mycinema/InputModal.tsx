import Image from 'next/image';
import { useRef, useState } from 'react';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { useAuthContext } from '@/providers/AuthProvider';
import { StarRating } from './StarRating';
import { sendList } from './sendGetList';
import { PopoverCo } from './PopoverCo';

type Props = {
  poster: string;
  posterbg: string;
  type: string;
  title: string;
};

export const InputModal = ({ poster, posterbg, movie, type, title }: Props): JSX.Element => {
  const { user } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [text, setText] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const toast = useToast();

  const onChange = (value: number) => {
    setValue(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // 映画を登録する
  // e: React.ChangeEvent<HTMLInputElement>
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await sendList(user, poster, posterbg, movie, title, type, text, value);
    toast({
      title: 'マイシネマに追加されました！',
      status: 'success',
      position: 'top',
      isClosable: true,
    });
    setText('');
    setValue(0);
    onClose();
  };

  return (
    <>
      {(user === null || user === undefined) && <PopoverCo />}
      {user && (
        <>
          <Button onClick={onOpen} width="55px" height="55px" p="8px" colorScheme="gray">
            {/* <SmallAddIcon /> */}
            <Image width={45} height={45} alt="cinemaadd" src="/film-add.svg"></Image>
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>マイルームに追加</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Flex>
                  <Image width="150" height="225" src={poster} alt="poster-image" />
                  <div>
                    <Heading size="md">{title}</Heading>
                    <StarRating value={value} size={20} setValue={setValue} onChange={onChange} />
                  </div>
                </Flex>
                <FormControl mt={4}>
                  <Textarea onChange={handleChange} type="text" value={text} placeholder="memo" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    onClose();
                    setText('');
                    setValue(0);
                  }}
                  mr={3}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} colorScheme="blue">
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};
