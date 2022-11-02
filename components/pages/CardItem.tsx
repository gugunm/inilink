import React from 'react';
import {
  Box,
  Flex,
  Image,
  Link,
  chakra,
  Spacer,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  HStack,
} from '@chakra-ui/react';
import { LinkIcon, CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { url } from 'inspector';
import CopyToClipboard from 'react-copy-to-clipboard';

export default function CardItem({ data }: any) {
  return (
    <Flex
      // bg='#edf3f8'
      // _dark={{ bg: '#3e3e3e' }}
      // p={50}
      w='full'
      alignItems='center'
      justifyContent='center'>
      <Box
        w='full'
        mx='auto'
        py={6}
        px={6}
        bg='white'
        _dark={{ bg: 'gray.800' }}
        shadow='lg'
        rounded='lg'>
        <chakra.h2
          color='gray.800'
          _dark={{ color: 'white' }}
          fontSize={{ base: 'base', md: 'lg' }}
          mt={{ base: 2, md: 0 }}
          fontWeight='bold'>
          {data.title}
        </chakra.h2>

        <chakra.p
          fontSize='sm'
          mt={1}
          color='gray.600'
          _dark={{ color: 'gray.200' }}>
          {data.description}
        </chakra.p>

        <Flex justifyContent='justify-between' mt={4}>
          <chakra.p fontSize='sm' color='teal.500'>
            http://inilink.vercel.app/{data.unique_name}
          </chakra.p>
          <Spacer />
          <Popover>
            <PopoverTrigger>
              {/* <Button bg='white'>
                <LinkIcon w={2} h={2} color='teal.600' />
              </Button> */}
              <Link
                fontSize='sm'
                color='teal.500'
                _dark={{ color: 'brand.300' }}>
                Actions
              </Link>
            </PopoverTrigger>
            <PopoverContent w={200}>
              <PopoverArrow />
              {/* <PopoverCloseButton /> */}
              <PopoverBody>
                <chakra.p color='teal.600' fontWeight={500} mb='2'>
                  Actions
                </chakra.p>
                <HStack gap={1}>
                  <Button colorScheme='teal' size='xs' variant='outline'>
                    Links
                  </Button>
                  <Button colorScheme='telegram' size='xs' variant='outline'>
                    Edit
                  </Button>
                  <Button colorScheme='red' size='xs' variant='outline'>
                    Delete
                  </Button>
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* <Link fontSize='sm' color='teal.500' _dark={{ color: 'brand.300' }}>
            Settings
          </Link> */}
        </Flex>
      </Box>
    </Flex>
  );
}
