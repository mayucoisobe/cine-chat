import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { BiCameraMovie } from 'react-icons/bi';
import { useAuthContext } from '@/providers/AuthProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';

export const Header = (): JSX.Element => {
  const { user } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const { push } = useRouter();

  const logOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await signOut(auth);
      toast({
        title: 'ログアウトしました。',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      push('/login');
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          // gap="60px"
          height="80px"
          className="container"
        >
          <Flex alignItems="center" gap="2">
            <Icon as={BiCameraMovie} w={8} h={8} />
            <Box className="font-ttl">
              <Link href="/">CINEMY==ROOM</Link>
            </Box>
          </Flex>
          <nav>
            <Flex as="ul" gap={3} display={{ base: 'none', md: 'flex' }}>
              <li>
                <Link href="/">ChatRoom</Link>
              </li>
              <li>
                <Link href="/tweet">Tweet24</Link>
              </li>
              <li>
                <Link href="/myroom">MyRoom</Link>
              </li>
              <li>
                <Link href="/myroom/search">Search</Link>
              </li>
              <li>{user ? <p onClick={logOut}>Logout</p> : <Link href="/login">Login</Link>}</li>
            </Flex>
          </nav>
          <IconButton icon={<HamburgerIcon />} display={{ base: 'block', md: 'none' }} onClick={onOpen} />
        </Flex>
        <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerBody p={0}>
                <Button w="100%" justifyContent="flex-start" onClick={onClose}>
                  <Link href="/">ChatRoom</Link>
                </Button>
                <Button w="100%" justifyContent="flex-start" onClick={onClose}>
                  <Link href="/tweet">Tweet24</Link>
                </Button>
                <Button w="100%" justifyContent="flex-start" onClick={onClose}>
                  <Link href="/myroom">MyRoom</Link>
                </Button>
                <Button w="100%" justifyContent="flex-start" onClick={onClose}>
                  <Link href="/myroom/search">Search</Link>
                </Button>
                <Button w="100%" justifyContent="flex-start" onClick={onClose}>
                  {user ? <p onClick={logOut}>Logout</p> : <Link href="/login">Login</Link>}
                </Button>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </header>
    </>
  );
};
