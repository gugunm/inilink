import Head from 'next/head';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { LinkIcon, CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useEffect, useState } from 'react';

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
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type DataPage = {
  title: string;
  description: string;
  unique_name: string;
  user_id: number;
  image: string;
  theme_color: string;
};

type DataLink = {
  url: string;
  link_title: string;
  page_id: number;
}[];

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

const PageLink: NextPage = () => {
  const router = useRouter();
  const { pname } = router.query;

  const { data: session, status } = useSession();

  const [dataLinks, setDataLinks] = useState<DataLink | []>([]);
  const [dataPage, setDataPage] = useState<DataPage | undefined>(undefined);

  useEffect(() => {
    if (!router.isReady) {
      return;
    } else {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API}/links/pname/${router?.query?.pname}`
        )
        .then((response) => response.data)
        .then((result) => {
          setDataPage(result.data);
          setDataLinks(result.data.links);
        })
        .catch(console.error);
    }
  }, [router.isReady]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <Head>
        <title>Inilink - {dataPage?.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <chakra.main bg={dataPage?.theme_color || 'telegram.500'} minH='100vh'>
        <Container maxW='md' centerContent>
          {/* <VStack w='full' mt={'40px'}> */}
          {/* <Avatar
            name='Dan Abrahmov'
            size='2xl'
            src='https://bit.ly/dan-abramov'
            mb='20px'
            mt='48px'
          /> */}
          <Avatar
            name={dataPage?.unique_name}
            size='2xl'
            src={
              dataPage?.unique_name &&
              `https://source.boringavatars.com/bauhaus/120/${dataPage?.unique_name}?colors=FFAD08,EDD75A,73B06F,0C8F8F,405059`
            }
            mb='20px'
            mt='48px'
          />
          <chakra.h1 color='white' fontSize='xl' fontWeight='bold' mb={2}>
            {dataPage?.title}
          </chakra.h1>
          <chakra.p color='white' fontSize='md' mb={'40px'}>
            {dataPage?.description}
          </chakra.p>
          <List spacing={3} w='full'>
            {dataLinks &&
              dataLinks?.map(({ link_title, url }) => {
                return (
                  <ListItem key={link_title}>
                    <RenderSingleLink title={link_title} url={url} />
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

export default PageLink;
