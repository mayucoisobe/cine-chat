import Image from 'next/image';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BsTrash3Fill } from 'react-icons/bs';
import { deleteList } from './deleteUpdateList';
// import { GlobalAuthState } from '@/providers/AuthProvider';
import type { ListProps } from './CinemaList';
import type { User } from '@firebase/auth';

type Props = {
  user: User;
  list: ListProps;
};

export const DeleteModal = ({ user, list }: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeleteList = async (docId: string) => {
    await deleteList(user, docId);
    toast({
      title: 'マイルームから削除しました！',
      status: 'success',
      position: 'top',
      isClosable: true,
    });
  };

  return (
    <>
      <Button colorScheme="brand" onClick={onOpen} p={0} w={{ base: '10', sm: '12' }} h={{ base: '10', sm: '12' }}>
        <Icon as={BsTrash3Fill} w={5} h={5} color="brand.200" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="brand.100" mx={{ base: '2' }}>
          <ModalHeader color="white">削除画面</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text color="white" pb={4}>
              マイルームから削除しますか？
            </Text>
            <Flex justifyContent="space-between" gap={{ base: '3', sm: '6' }}>
              <Box w="40%">
                <Image
                  src={list.src}
                  width={150}
                  height={225}
                  alt={list.title}
                  style={{
                    borderRadius: '.5rem',
                  }}
                />
              </Box>
              <Box w="55%">
                <Text color="white" fontWeight="600" fontSize={{ base: 'md', sm: 'xl' }}>
                  {list.title}
                </Text>
              </Box>
            </Flex>
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
