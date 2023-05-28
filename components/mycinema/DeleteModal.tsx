import Image from 'next/image';
import {
  Button,
  ButtonGroup,
  Icon,
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
import { BsTrash3Fill } from 'react-icons/bs';
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
      <Button colorScheme="brand" onClick={onOpen} p={0}>
        <Icon as={BsTrash3Fill} w={5} h={5} color="brand.200" />
        {/* 削除 */}
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
