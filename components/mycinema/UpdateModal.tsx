import Image from 'next/image';
import { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
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
      <Button colorScheme="brand" onClick={onOpen} p={0} w={{ base: '10', sm: '12' }} h={{ base: '10', sm: '12' }}>
        <Icon as={RiEditLine} w={5} h={5} color="brand.200" />
        {/* 編集 */}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="brand.100" mx={{ base: '2' }}>
          <ModalHeader color="white">編集画面</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text color="white" pb={4}>
              変更内容を保存しますか？
            </Text>
            <Flex justifyContent="space-between" gap={{ base: '3', sm: '6' }}>
              <Box w="40%">
                <Image
                  width="150"
                  height="225"
                  alt={list.title}
                  src={list.src}
                  style={{
                    borderRadius: '.5rem',
                  }}
                />
              </Box>
              <Box w="55%">
                <Text color="white" fontWeight="600" fontSize={{ base: 'md', sm: 'xl' }} pb={4}>
                  {list.title}
                </Text>
                <StarRating value={value} size={20} setValue={setValue} onChange={onChange} />
              </Box>
            </Flex>
            <FormControl mt={4}>
              <Textarea onChange={handleChange} type="text" value={text} placeholder="pls edit here" color="white" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="teal"
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
