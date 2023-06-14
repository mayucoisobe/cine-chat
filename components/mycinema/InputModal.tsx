import Image from 'next/image';
import { useRef, useState } from 'react';
import {
  Box,
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
import { useAuthContext } from '@/providers/AuthProvider';
import { StarRating } from './StarRating';
import { sendList } from './sendGetList';
import { PopoverCo } from './PopoverCo';
import type { User } from '@firebase/auth';
import type { MovieProps } from './CinemaSearch';

type Props = {
  poster: string;
  posterbg: string;
  movie: MovieProps;
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
    await sendList(user as User, poster, posterbg, movie, title, type, text, value);
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
            <Image width={45} height={45} alt="cinemaadd" src="/film-add.svg"></Image>
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="brand.100" mx={{ base: '2' }}>
              <ModalHeader color="white">マイルームに追加</ModalHeader>
              <ModalCloseButton color="white" />
              <ModalBody pb={6}>
                <Flex justifyContent="space-between" gap={{ base: '3', sm: '6' }}>
                  <Box w="40%">
                    <Image
                      width="150"
                      height="225"
                      src={poster}
                      alt="poster-image"
                      style={{
                        borderRadius: '.5rem',
                      }}
                    />
                  </Box>
                  <Box w="55%">
                    <Heading color="white" fontWeight="600" fontSize={{ base: 'md', sm: 'xl' }} pb={4}>
                      {title}
                    </Heading>
                    <StarRating value={value} size={20} onChange={onChange} />
                  </Box>
                </Flex>
                <FormControl mt={4}>
                  <Textarea onChange={handleChange} value={text} placeholder="memo" color="white" />
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
                  キャンセル
                </Button>
                <Button onClick={handleSubmit} colorScheme="teal">
                  追加する
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};
