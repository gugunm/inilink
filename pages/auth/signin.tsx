import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import {
  chakra,
  Box,
  Flex,
  Badge,
  Input,
  VisuallyHidden,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
  Text,
  Center,
} from '@chakra-ui/react';

import LinkNext from 'next/link';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function App() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={0}
      h='calc(100vh)'
      _after={{
        bg: 'white',
        // opacity: 0.25,
        pos: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}>
      <Flex
        direction='column'
        alignItems='start'
        justifyContent='center'
        px={{ base: 4, lg: 20 }}
        py={24}>
        {/* <Badge
          color='white'
          px={3}
          py={1}
          mb={3}
          variant='solid'
          colorScheme='brand'
          rounded='full'>
          Pre Beta
        </Badge> */}
        <LinkNext href='/'>
          <a>
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme='brand'
              mb={6}
              variant='ghost'>
              Back to home
            </Button>
          </a>
        </LinkNext>
        <chakra.h1
          mb={8}
          fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
          fontWeight='bold'
          color='brand.600'
          _dark={{ color: 'gray.300' }}
          lineHeight='shorter'>
          Great step to start creating.
        </chakra.h1>
        {/* <chakra.form w='full' mb={6}>
          <VisuallyHidden>Your Email</VisuallyHidden>
          <Box display={{ base: 'block', lg: 'none' }}>
            <Input
              size='lg'
              color='brand.900'
              type='email'
              placeholder='Enter your email...'
              bg='white'
            />
            <Button
              w='full'
              mt={2}
              color='white'
              variant='solid'
              colorScheme='brand'
              size='lg'
              type='submit'>
              Get Started
            </Button>
          </Box> */}
        {/* <InputGroup size='lg' w='full' display={{ base: 'none', lg: 'flex' }}>
            <Input
              size='lg'
              color='brand.900'
              type='email'
              placeholder='Enter your email...'
              bg='white'
            />
            <InputRightElement w='auto'>
              <Button
                color='white'
                variant='solid'
                colorScheme='brand'
                size='lg'
                type='submit'
                roundedLeft={0}>
                Get Started
              </Button>
            </InputRightElement>
          </InputGroup> */}
        <Button
          as='a'
          w={{
            base: 'full',
            sm: 'auto',
          }}
          variant={'outline'}
          colorScheme='white'
          cursor='pointer'
          size='lg'
          mb={{
            base: 2,
            sm: 0,
          }}
          leftIcon={<FcGoogle />}
          // href={`/api/auth/signin`}
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
          <Center>
            <Text>Sign in with Google</Text>
          </Center>
        </Button>
        {/* </chakra.form> */}
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mt={6}
          mb={4}
          fontSize='sm'
          color='brand.600'
          _dark={{ color: 'gray.400' }}
          letterSpacing='wider'>
          Sign in with your personal email, and start create a links.
        </chakra.p>
      </Flex>
      <Box>
        <Image
          src='../login-bg.jpg'
          // alt='3 women looking at a laptop'
          fit='cover'
          w='full'
          h='calc(100vh)'
          // h={{ base: 64, md: 'full' }}
          bg='gray.100'
          loading='lazy'
        />
      </Box>
    </SimpleGrid>
  );
}
