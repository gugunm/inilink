import React from 'react';
import { useRouter } from 'next/router';

import { useSession, signOut } from 'next-auth/react';

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Tabs,
  TabList,
  Tab,
  Spacer,
  Text,
  Container,
} from '@chakra-ui/react';
// import { Logo } from '@choc-ui/logo';
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineSearch,
  AiFillBell,
} from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';

// import * as React from 'react';
import { FC } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

type Props = {
  children?: React.ReactNode;
};

export default function LayoutDashboard({ children }: Props) {
  // const LayoutDashboard: FC<Props> = ({ children }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const router = useRouter();

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <Box shadow='md'>
        <chakra.header
          bg={bg}
          borderColor='gray.200'
          borderBottomWidth={1}
          w='full'
          px={{ base: 2, sm: 4 }}
          py={4}>
          <Flex alignItems='center' justifyContent='space-between' mx='auto'>
            <HStack spacing={4} display='flex' alignItems='center'>
              <Box display={{ base: 'inline-flex', md: 'none' }}>
                <IconButton
                  display={{ base: 'flex', md: 'none' }}
                  aria-label='Open menu'
                  fontSize='20px'
                  color='gray.800'
                  _dark={{ color: 'inherit' }}
                  variant='ghost'
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />
                {/* <VStack
                  pos='absolute'
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? 'flex' : 'none'}
                  flexDirection='column'
                  p={2}
                  pb={4}
                  m={2}
                  bg={bg}
                  spacing={3}
                  rounded='sm'
                  shadow='sm'>
                  <CloseButton
                    aria-label='Close menu'
                    justifySelf='self-start'
                    onClick={mobileNav.onClose}
                  />
                  <Button w='full' variant='ghost' leftIcon={<AiFillHome />}>
                    Dashboard
                  </Button>
                  <Button
                    w='full'
                    variant='solid'
                    colorScheme='brand'
                    leftIcon={<AiOutlineInbox />}>
                    Inbox
                  </Button>
                  <Button
                    w='full'
                    variant='ghost'
                    leftIcon={<BsFillCameraVideoFill />}>
                    Videos
                  </Button>
                </VStack> */}
              </Box>
              <chakra.h1
                fontSize={{ base: 'xl', md: '2xl' }}
                alignItems='center'>
                <Text
                  display={{ base: 'block', lg: 'inline' }}
                  w='full'
                  bgClip='text'
                  bgGradient='linear(to-r, cyan.500, purple.600)'
                  fontWeight='bold'>
                  Inilink
                </Text>
              </chakra.h1>
              {/* <chakra.a
              href='/'
              title='Choc Home Page'
              display='flex'
              alignItems='center'>
              <p>Logo</p>
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a> */}
              {/* <chakra.h1 fontSize='xl'>Settings</chakra.h1> */}
            </HStack>
            <HStack spacing={3} display='flex' alignItems='center'>
              <HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }}>
                <chakra.p>Hi, {session?.user?.name}</chakra.p>
                {/* <Button variant='ghost' leftIcon={<AiFillHome />} size='sm'>
                  Dashboard
                </Button> */}
                {/* <Button
                variant='solid'
                colorScheme='brand'
                leftIcon={<AiOutlineInbox />}
                size='sm'>
                Inbox
              </Button>
              <Button
                variant='ghost'
                leftIcon={<BsFillCameraVideoFill />}
                size='sm'>
                Videos
              </Button> */}
                <Button
                  size='sm'
                  // rightIcon={<ArrowForwardIcon />}
                  colorScheme='teal'
                  variant='ghost'
                  onClick={() => signOut()}>
                  Logout
                </Button>
              </HStack>
              {/* <chakra.a
              p={3}
              color='gray.800'
              _dark={{ color: 'inherit' }}
              rounded='sm'
              _hover={{ color: 'gray.800', _dark: { color: 'gray.600' } }}>
              <AiFillBell />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a> */}

              <Avatar
                size='sm'
                name={session?.user?.name || 'Anonymous'}
                // src='https://bit.ly/dan-abramov'
                src={session?.user?.image || 'https://bit.ly/dan-abramov'}
              />
            </HStack>
          </Flex>
        </chakra.header>
        <Flex
          alignItems='center'
          justifyContent='center'
          mx={2}
          borderWidth={0}
          overflowX='auto'>
          <Tabs defaultIndex={0} borderBottomColor='transparent'>
            <TabList>
              <Tab
                py={4}
                m={0}
                _focus={{ boxShadow: 'none' }}
                onFocus={() => router.push('/dashboard')}>
                Pages
              </Tab>
              <Tab
                py={4}
                m={0}
                _focus={{ boxShadow: 'none' }}
                onFocus={() => router.push('/appearance')}>
                Appearance
              </Tab>
            </TabList>
          </Tabs>
          {/* <Spacer /> */}
          {/* <HStack spacing={3} alignItems='center'>
            <InputGroup display={{ base: 'none', lg: 'block' }} ml='auto'>
              <InputLeftElement pointerEvents='none'>
                <AiOutlineSearch />
              </InputLeftElement>
              <Input type='tel' placeholder='Search...' />
            </InputGroup>
          </HStack> */}
        </Flex>
      </Box>
      <Box>{children}</Box>
    </>
  );
}

// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       session: await getSession(ctx)
//     }
//   }
// }

// export default LayoutDashboard;
