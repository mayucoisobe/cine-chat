import Link from 'next/link';
import { Flex, Heading, Text } from '@chakra-ui/react';

type HeadTitleProps = {
  title: string;
};

export const HeadTitle = ({ title }: HeadTitleProps) => {
  return (
    <>
      <Flex pt="5vh" pb={{ base: '4', sm: '8' }}>
        <Text color="white" fontSize={{ base: 'md', sm: 'lg' }}>
          <Link href="/" style={{ width: 'fit-content' }}>
            ← Home
          </Link>
        </Text>
        <Heading as="h2" color="white" textAlign="center" fontSize={{ base: 'xl', sm: '2xl' }} pl={10}>
          {title}
        </Heading>
      </Flex>
    </>
  );
};
