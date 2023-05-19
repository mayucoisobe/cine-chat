import Image from 'next/image';
import { useRef } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Flex,
  Textarea,
} from '@chakra-ui/react';

export const ModalRecord = ({ poster, title }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen}>
        <AddIcon />
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>マイシネマに登録</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex>
              <img width="150" src={poster} />
              <div>
                <p>{title}</p>
                <div>ポイントつける</div>
                <div>タグ</div>
              </div>
            </Flex>
            <FormControl mt={4}>
              <FormLabel>Memo</FormLabel>
              <Textarea placeholder="Memo" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
