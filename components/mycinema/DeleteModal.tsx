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
} from '@chakra-ui/react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { deleteList } from './deleteUpdateList';

export const DeleteModal = ({ user, docId }: JSX.Element) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteList = async (docId) => {
    await deleteList(user, docId);
  };

  return (
    <>
      <Button leftIcon={<RiDeleteBin2Fill />} colorScheme="gray" onClick={onOpen}>
        削除
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>マイシネマから削除しますか？</ModalHeader>
          <ModalCloseButton />
          <ModalBody>この操作は取り消せません。削除しますか？</ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                いいえ
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteList(docId);
                  onClose();
                }}
              >
                はい
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
