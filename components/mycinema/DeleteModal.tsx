import Image from 'next/image';
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
  useToast,
} from '@chakra-ui/react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { deleteList } from './deleteUpdateList';

export const DeleteModal = ({ user, list }: JSX.Element) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeleteList = async (docId) => {
    await deleteList(user, docId);
    toast({
      title: 'マイシネマから削除しました！',
      status: 'success',
      position: 'top',
      isClosable: true,
    });
  };

  return (
    <>
      <Button leftIcon={<RiDeleteBin2Fill />} colorScheme="gray" onClick={onOpen}>
        削除
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>削除画面</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            マイシネマから削除しますか？
            <p>{list.title}</p>
            <Image width="150" height="225" alt={list.title} src={list.src} />
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteList(list.docId);
                  onClose();
                }}
              >
                削除する
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
