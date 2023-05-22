import Image from 'next/image';
import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  Flex,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { RiEditLine } from 'react-icons/ri';
import { updateList } from './deleteUpdateList';
import { StarRating } from './StarRating';

export const UpdateModal = ({ user, list }: JSX.Element) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState<string>(`${list.text}`);
  const [value, setValue] = useState<number>(list.star);
  const toast = useToast();

  const handleUpdateList = async (docId) => {
    await updateList(user, docId, text, value);
    toast({
      title: 'マイシネマを更新しました！',
      status: 'success',
      position: 'top',
      isClosable: true,
    });
  };

  const onChange = (value: number) => {
    setValue(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <Button leftIcon={<RiEditLine />} colorScheme="pink" onClick={onOpen}>
        編集
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>編集画面</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            変更内容を保存しますか？{list.docId}
            <Flex>
              <Image width="150" height="225" alt={list.title} src={list.src} />
              <div>
                <h2>{list.title}</h2>
                <StarRating
                  value={value}
                  setValue={setValue}
                  onChange={onChange}
                />
              </div>
            </Flex>
            <FormControl mt={4}>
              <Textarea
                onChange={handleChange}
                type="text"
                value={text}
                placeholder="pls edit here"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleUpdateList(list.docId);
                  onClose();
                }}
              >
                保存する
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
