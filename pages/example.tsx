import Head from 'next/head';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { LinkIcon, CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useState } from 'react';

import {
  Container,
  Box,
  VStack,
  Avatar,
  chakra,
  Text,
  List,
  ListItem,
  ListIcon,
  Link,
  LinkBox,
  LinkOverlay,
  Heading,
  Flex,
  Spacer,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  InputGroup,
  Input,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';

function RenderSingleLink({ title = '', url = '' }) {
  const toast = useToast();
  return (
    <LinkBox
      // as='article'
      maxW='full'
      p='4'
      mb={2}
      bg='white'
      borderWidth='1px'
      rounded='md'>
      <Flex minWidth='max-content' alignItems='center' gap='3'>
        <LinkOverlay
          as='a'
          // bg='teal.400'
          fontSize='sm'
          isExternal={true}
          maxW='xs'
          href={url}>
          {title}
        </LinkOverlay>
        <Spacer />
        {/* <Box
          as='a'
          color='teal.400'
          href='http://facebook.com'
          fontWeight='bold'
          fontSize='sm'
          bg='white'>
          Button
        </Box> */}
        <Popover>
          <PopoverTrigger>
            <Button bg='white'>
              <LinkIcon w={4} h={4} color='teal.600' />
            </Button>
          </PopoverTrigger>
          <PopoverContent w={300}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <chakra.h6 color='teal.600' fontWeight={600} mb='2'>
                Share Link
              </chakra.h6>
              <InputGroup size='md'>
                <Input pr='4.5rem' type='text' value={url} readOnly />
                <InputRightElement width='4.5rem'>
                  <CopyToClipboard
                    text={url}
                    onCopy={() =>
                      toast({
                        title: 'Link copied.',
                        description:
                          "We've copied the link, share it anywhere.",
                        status: 'success',
                        variant: 'subtle',
                        duration: 3000,
                        isClosable: true,
                      })
                    }>
                    <Button h='1.75rem' size='sm'>
                      <CopyIcon w={4} h={4} color='teal.600' />
                    </Button>
                  </CopyToClipboard>
                </InputRightElement>
              </InputGroup>
              {/* <Button bg='white'>
                <CopyIcon w={3} h={3} color='teal.500' />
              </Button>
              <Button bg='white'>
                <ExternalLinkIcon w={3} h={3} color='teal.500' />
              </Button> */}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </LinkBox>
  );
}

const data = [
  {
    title: 'Materi SIMA Perencanaan',
    url: 'https://docs.google.com/presentation/d/1skQ_T3SdNEFofpl3i7YYj33Yv3U8AI5Q',
  },
  {
    title: 'Materi SIMA',
    url: 'https://docs.google.com/presentation/d/1ur45nsOTFR7orpULRolF9gzQxubggrX6',
  },
  {
    title: 'Materi SIMA Mobile',
    url: 'https://docs.google.com/presentation/d/1aoUhxcPhok69w8-4jnrWJcEDKR4-EDBvYoHNDL0Ehs0',
  },
  {
    title: 'Materi SIMA Laksa',
    url: 'https://drive.google.com/drive/folders/1C5Mjm9EhmHy91KYMCV0BK-yWb7FG-Pgc',
  },
  // {
  //   title: 'Materi New Monsima',
  //   url: 'https://docs.google.com/presentation/d/11Hj1n0mb68X8k3lwrnapT4fi02AoBBkJ',
  // },
  // {
  //   title: 'Materi SimhpNas',
  //   url: 'https://docs.google.com/presentation/d/1OP_ucrBCTfrIzEYNTGxwSWPDyoXZQtE3E0ljlByV2H8',
  // },
];

const ExamplePageLink: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inilink - Sosialisasi Pusinfo</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <chakra.main bg='telegram.500' minH='100vh'>
        <Container maxW='md' centerContent>
          {/* <VStack w='full' mt={'40px'}> */}
          <Avatar
            name='Dan Abrahmov'
            size='2xl'
            src='https://bit.ly/dan-abramov'
            mb='20px'
            mt='48px'
          />
          <chakra.h1
            color='white'
            fontSize='xl'
            fontWeight='bold'
            marginBottom='12px'>
            Example Page Link
          </chakra.h1>
          <chakra.p color='white' fontSize='md' mb={'40px'}>
            Description for example page link
          </chakra.p>
          <List spacing={3} w='full'>
            {data.map(({ title, url }) => {
              return (
                <ListItem key={title}>
                  <RenderSingleLink title={title} url={url} />
                </ListItem>
              );
            })}
            {/* <RenderSingleLink /> */}
            {/* <Link>
                <Box
                  fontSize='sm'
                  padding='4'
                  bg='white'
                  color='black'
                  w='full'>
                  Materi SIMHPNAS
                </Box>
              </Link> */}
          </List>
          {/* </VStack> */}
        </Container>
        {/* <chakra.footer>
          <chakra.p>Proudly developed by Gugun M</chakra.p>
        </chakra.footer> */}
      </chakra.main>
    </>
  );
};

export default ExamplePageLink;
