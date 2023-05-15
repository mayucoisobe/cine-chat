import React, { useContext } from 'react';
import Link from 'next/link';
import { IsAuthContext } from '@/providers/IsAuthProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
// import styles from './Header.module.css';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Header() {
  const { isAuth, setIsAuth } = useContext(IsAuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log('ヘッダー' + isAuth);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsAuth(false);
        console.log(isAuth);
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };
  return (
    <>
      <header>
        <Flex justifyContent="space-between" alignItems="center" gap="60px" height="80px" className="container">
          <Box as="p">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-twitter"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </Box>
          <nav>
            <Flex as="ul" display={{ base: 'none', md: 'flex' }}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/chat">Chat</Link>
              </li>
              <li>{isAuth ? <p onClick={logOut}>Logout</p> : <Link href="/login">Login</Link>}</li>
            </Flex>
          </nav>
          <IconButton icon={<HamburgerIcon />} display={{ base: 'block', md: 'none' }} onClick={onOpen} />
        </Flex>
        <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerBody p={0}>
                <Button w="100%" justifyContent="flex-start">
                  <Link href="/">TOP</Link>
                </Button>
                <Button w="100%" justifyContent="flex-start">
                  <Link href="/chat">Chat</Link>
                </Button>
                <Button w="100%" justifyContent="flex-start">
                  {isAuth ? <p onClick={logOut}>Logout</p> : <Link href="/login">Login</Link>}
                </Button>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </header>
    </>
  );
}
