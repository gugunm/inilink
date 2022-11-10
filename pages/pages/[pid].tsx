import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/react';
import LayoutDashboard from '../../components/headers/DashboardNavbar';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { SmallAddIcon } from '@chakra-ui/icons';
import CardItem from '../../components/pages/CardItem';

import NextLink from 'next/link';

type DataPage = {
  title: string;
  description: string;
  unique_name: string;
  user_id: number;
  image: string;
};

type DataLink = {
  url: string;
  link_title: string;
  page_id: number;
}[];

export default function Links() {
  const router = useRouter();
  const pid = router.query.pid;
  const toast = useToast();
  const { data: session, status } = useSession();

  const [dataLinks, setDataLinks] = useState<DataLink | []>([]);
  const [dataPage, setDataPage] = useState<DataPage | undefined>(undefined);
  const [formData, setFormData] = useState({
    url: '',
  });

  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_API}/links/${pid}`)
      .then((response) => response.data)
      .then((result) => {
        setDataPage(result.data);
        setDataLinks(result.data.links);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    } else {
      fetchData();
    }
  }, [router.isReady]);

  const handleSubmitLink = (e: any) => {
    e.preventDefault();

    const link_title = formData.url.replace(/.+\/\/|www.|\..+/g, '');

    // console.log('--> Data to submit ');
    // console.log({ ...formData, link_title, page_id: pid });

    axios
      .post('/api/links/create', { ...formData, link_title, page_id: pid })
      .then(function (response) {
        // console.log(response);
        toast({
          title: 'Link Creeated',
          description: "We've created your new link",
          status: 'success',
          variant: 'subtle',
          duration: 3000,
          isClosable: true,
        });
        setFormData({
          url: '',
        });
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <Flex direction='column' pt={8} px={8} alignItems='center'>
      <Box w='lg'>
        <Flex
          mb={4}
          direction='row'
          alignItems='center'
          justify='space-between'>
          <chakra.p bg='gray.100' py={2} px={8} borderRadius='full'>
            inilink.vercel.app/
            <chakra.span color='teal.500'>{dataPage?.unique_name}</chakra.span>
          </chakra.p>

          <Avatar
            size='lg'
            // name={session?.user?.name || 'Anonymous'}
            // src='https://bit.ly/dan-abramov'
            // src={dataPage?.image}
            src={
              dataPage?.unique_name &&
              `https://source.boringavatars.com/bauhaus/120/${dataPage?.unique_name}?colors=FFAD08,EDD75A,73B06F,0C8F8F,405059`
            }
            mb={4}
          />
        </Flex>
        {/* <Avatar
          size='xl'
          // name={session?.user?.name || 'Anonymous'}
          // src='https://bit.ly/dan-abramov'
          src={dataPage?.image}
          mb={4}
        /> */}

        <Box>
          <Heading fontSize='xl' mb={2}>
            {dataPage?.title}
          </Heading>
          {/* <chakra.p>{dataPage?.unique_name}</chakra.p> */}
          <chakra.h5 mb={5}>{dataPage?.description}</chakra.h5>

          <form onSubmit={handleSubmitLink}>
            <FormControl onSubmit={handleSubmitLink}>
              <HStack spacing={4}>
                {/* <FormLabel>Link</FormLabel> */}
                <Input
                  // ref={titleRef}
                  placeholder='Paste your link here'
                  value={formData.url}
                  onChange={handleChange}
                  name='url'
                />
                <Button
                  // leftIcon={<SmallAddIcon />}
                  colorScheme='teal'
                  type='submit'
                  variant='outline'>
                  Add Link
                </Button>
              </HStack>
            </FormControl>
          </form>
        </Box>

        <List mb={4} spacing={3} mt={6}>
          {dataLinks?.map((link: any) => {
            return (
              <ListItem
                key={link.link_title}
                bg='gray.100'
                p={5}
                borderRadius='xl'>
                <chakra.h3 mb={2}>{link?.link_title}</chakra.h3>
                <chakra.p color='teal.500'>{link?.url}</chakra.p>
                {/* <CardItem data={item} /> */}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Flex>
  );
}

Links.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
