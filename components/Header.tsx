import Link from 'next/link';
import Image from 'next/image';
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
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import styles from '../styles/header.module.css';
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
          height="80px"
          pos="fixed"
          w="full"
          top="0"
          left="0"
          zIndex="300"
          bg="linear-gradient(180deg,rgb(29 31 32 / 80%),rgb(1 6 1 / 80%) 65.62%)"
          color="white"
          px={{ base: '4', sm: '6' }}
          className={styles.headerWrap}
        >
          <Flex alignItems="center" gap="2">
            <Box className="font-ttl">
              <Link href="/">CINEMY==ROOM</Link>
            </Box>
          </Flex>
          <nav>
            <Flex as="ul" gap={6} display={{ base: 'none', md: 'flex' }}>
              <li className="font-ttl-sm">
                <Link href="/">Chat</Link>
              </li>
              <li className="font-ttl-sm">
                <Link href="/myroom">MyRoom</Link>
              </li>
              <li className="font-ttl-sm">
                <Link href="/myroom/search">Search</Link>
              </li>
              <li className="font-ttl-sm">
                <Link href="/analyze">Analyze U</Link>
              </li>
              <li className="font-ttl-sm">
                {user ? <p onClick={logOut}>Logout</p> : <Link href="/login">Login</Link>}
              </li>
            </Flex>
          </nav>
          <IconButton
            aria-label="Open menu"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ base: 'block', md: 'none' }}
            onClick={onOpen}
            background="transparent !important"
          />
        </Flex>
        <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay mt="80px">
            <DrawerContent mt="80px" bg="brand.100">
              <DrawerBody p={0}>
                <Link href="/" style={{ padding: '1rem 0' }} className={styles.spMenu}>
                  <Button
                    onClick={onClose}
                    w="100%"
                    justifyContent="flex-start"
                    bg="brand.100"
                    color="white"
                    px={{ base: '4', sm: '6' }}
                    _active={{ bg: 'brand.100', opacity: '.7' }}
                    _hover={{ bg: 'brand.100', opacity: '.7' }}
                  >
                    ChatRoom <span style={{ fontSize: '14px', paddingLeft: '1em' }}> - チャットルーム - </span>
                  </Button>
                </Link>
                <Link href="/myroom" style={{ padding: '1rem 0' }}>
                  <Button
                    onClick={onClose}
                    w="100%"
                    justifyContent="flex-start"
                    bg="brand.100"
                    color="white"
                    px={{ base: '4', sm: '6' }}
                    _active={{ bg: 'brand.100', opacity: '.7' }}
                    _hover={{ bg: 'brand.100', opacity: '.7' }}
                  >
                    MyRoom <span style={{ fontSize: '14px', paddingLeft: '1em' }}> - マイルーム - </span>
                  </Button>
                </Link>
                <Link href="/myroom/search" style={{ padding: '1rem 0' }}>
                  <Button
                    onClick={onClose}
                    w="100%"
                    justifyContent="flex-start"
                    bg="brand.100"
                    color="white"
                    px={{ base: '4', sm: '6' }}
                    _active={{ bg: 'brand.100', opacity: '.7' }}
                    _hover={{ bg: 'brand.100', opacity: '.7' }}
                  >
                    Search<span style={{ fontSize: '14px', paddingLeft: '1em' }}> - 作品を探す - </span>
                  </Button>
                </Link>
                <Link href="/analyze" style={{ padding: '1rem 0' }}>
                  <Button
                    onClick={onClose}
                    w="100%"
                    justifyContent="flex-start"
                    bg="brand.100"
                    color="white"
                    px={{ base: '4', sm: '6' }}
                    _active={{ bg: 'brand.100', opacity: '.7' }}
                    _hover={{ bg: 'brand.100', opacity: '.7' }}
                  >
                    Analyze U <span style={{ fontSize: '14px', paddingLeft: '1em' }}> - 分析ページ - </span>
                  </Button>
                </Link>
                {user ? (
                  <Button
                    onClick={() => {
                      logOut();
                      onClose();
                    }}
                    w="100%"
                    justifyContent="flex-start"
                    bg="brand.100"
                    color="white"
                    h="72px"
                    px={{ base: '4', sm: '6' }}
                    _active={{ bg: 'brand.100', opacity: '.7' }}
                    _hover={{ bg: 'brand.100', opacity: '.7' }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login" style={{ padding: '1rem 0' }}>
                    <Button
                      onClick={() => {
                        onClose();
                      }}
                      w="100%"
                      justifyContent="flex-start"
                      bg="brand.100"
                      color="white"
                      px={{ base: '4', sm: '6' }}
                      _active={{ bg: 'brand.100', opacity: '.7' }}
                      _hover={{ bg: 'brand.100', opacity: '.7' }}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </header>
    </>
  );
};
