import Link from 'next/link';
import { Box, Heading, Text } from '@chakra-ui/react';

type HeadTitleProps = {
  title: string;
};

export const HeadTitle = ({ title }: HeadTitleProps) => {
  return (
    <>
      <Box pt="5vh">
        <Text color="white" fontSize={{ base: 'md', sm: 'lg' }}>
          <Link href="/" style={{ width: 'fit-content' }}>
            ← Back to home
          </Link>
        </Text>
        <Heading
          as="h2"
          color="white"
          textAlign="center"
          my={{ base: '4', sm: '8' }}
          fontSize={{ base: '2xl', sm: '3xl' }}
        >
          {title}
        </Heading>
      </Box>
    </>
  );
};
