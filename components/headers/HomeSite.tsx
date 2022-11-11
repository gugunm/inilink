import React from 'react';
import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  VStack,
  chakra,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useScroll } from 'framer-motion';
import { FaHeart, FaMoon, FaSun } from 'react-icons/fa';
import {
  AiFillGithub,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineMenu,
} from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';
// import { Logo } from "@choc-ui/logo";
import LinkNext from 'next/link';

import { useSession } from 'next-auth/react';

export default function HomeSiteHeader() {
  const { data: session, status } = useSession();
  const mobileNav = useDisclosure();

  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const bg = useColorModeValue('white', 'gray.800');
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [y, setY] = React.useState(0);
  const height = ref.current ? ref.current.getBoundingClientRect() : 0;

  const { scrollY } = useScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const SponsorButton = (
    <Box
      display={{ base: 'none', md: 'flex' }}
      alignItems='center'
      as='a'
      aria-label='Buy a coffee for creator'
      href={'https://trakteer.id/gugunm/'}
      target='_blank'
      rel='noopener noreferrer'
      bg='gray.50'
      borderWidth='1px'
      borderColor='gray.200'
      px='1em'
      minH='36px'
      rounded='md'
      fontSize='sm'
      color='gray.800'
      outline='0'
      transition='all 0.3s'
      _hover={{
        bg: 'gray.100',
        borderColor: 'gray.300',
      }}
      _active={{
        borderColor: 'gray.200',
      }}
      _focus={{
        boxShadow: 'outline',
      }}
      ml={4}>
      <Box as='strong' lineHeight='inherit' fontWeight='semibold'>
        Buy me a coffee
      </Box>
      <Icon as={FaHeart} w='4' h='4' color='red.500' ml='2' />
    </Box>
  );
  const MobileNavContent = (
    <VStack
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
      <Button w='full' variant='ghost' leftIcon={<BsFillCameraVideoFill />}>
        Videos
      </Button>
    </VStack>
  );
  return (
    <Box pos='relative'>
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition='box-shadow 0.2s'
        bg={bg}
        borderTop='6px solid'
        borderTopColor='brand.400'
        w='full'
        overflowY='hidden'>
        <chakra.div h='4.5rem' mx='auto' maxW='1200px'>
          <Flex w='full' h='full' px='6' align='center' justify='space-between'>
            <Flex align='center'>
              <Link href='/' style={{ textDecoration: 'none' }}>
                <HStack>
                  <chakra.h1 fontSize={{ base: 'xl', md: '2xl' }}>
                    <Text
                      display={{ base: 'block', lg: 'inline' }}
                      w='full'
                      bgClip='text'
                      bgGradient='linear(to-r, cyan.500, purple.600)'
                      fontWeight='bold'>
                      Inilink
                    </Text>
                  </chakra.h1>
                </HStack>
              </Link>
            </Flex>

            {status != 'unauthenticated' ? (
              <LinkNext href='/dashboard'>
                <a>
                  <Button colorScheme='brand' variant='outline' size='sm'>
                    Dashbaord
                  </Button>
                </a>
              </LinkNext>
            ) : (
              <Flex
                justify='flex-end'
                w='full'
                maxW='824px'
                align='center'
                color='gray.400'>
                <HStack spacing='5' display={{ base: 'none', md: 'flex' }}>
                  <Link
                    isExternal
                    aria-label='Go to Inilink GitHub page'
                    href='https://github.com/gugunm/inilink.git'>
                    <Icon
                      as={AiFillGithub}
                      display='block'
                      transition='color 0.2s'
                      w='5'
                      h='5'
                      _hover={{ color: 'gray.600' }}
                    />
                  </Link>
                </HStack>
                <LinkNext href='/auth/signin'>
                  <a>
                    <Button
                      ml={{ base: '0', md: '4' }}
                      colorScheme='brand'
                      variant='ghost'
                      size='sm'>
                      Sign in
                    </Button>
                  </a>
                </LinkNext>
                {/* <IconButton
                size='md'
                fontSize='lg'
                aria-label={`Switch to ${text} mode`}
                variant='ghost'
                color='current'
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              /> */}
                {SponsorButton}
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
              </Flex>
            )}
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </Box>
  );
}
