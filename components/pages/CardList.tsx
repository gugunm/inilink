import { Button, Flex, Heading, List, ListItem } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { useSession, getSession } from 'next-auth/react';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import CardItem from './CardItem';
import { SmallAddIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function CardList() {
  const { data: session, status } = useSession();
  const [dataPages, setDataPages] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/pages/${session?.user?.email}`)
      .then((response) => response.data)
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((result) => setDataPages(result.data.pages))
      .catch(console.error);
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <Flex direction='column' pt={8} px={8} alignItems='center'>
      <Flex
        mb={4}
        w='lg'
        direction='row'
        alignItems='center'
        justify='space-between'>
        <Heading fontSize='lg'>Your Pages</Heading>
        <Link href='/dashboard/pages/create' passHref legacyBehavior>
          <Button
            leftIcon={<SmallAddIcon />}
            colorScheme='teal'
            variant='outline'>
            New Page
          </Button>
        </Link>
      </Flex>
      <List w='lg' mb={4} spacing={3}>
        {dataPages?.map((item: any) => {
          // console.log('--> ITEM DATA PAGES : ');
          // console.log(item);

          return (
            <ListItem key={item.id}>
              <CardItem data={item} />
            </ListItem>
          );
        })}
      </List>
    </Flex>
  );
}

// import { prisma } from '../../lib/prisma';

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const allPage = await axios.get('http://localhost:3000/api/pages/fetchall');

//   console.log('--> All Pages');
//   console.log(allPage.data);

// const session = await getSession(ctx);

// const user = session?.user;

// const data = await prisma.user.findUnique({
//   where: { email: user?.email || '' },
//   include: {
//     pages: true,
//   },
// });

//   return {
//     // props: { data: JSON.parse(JSON.stringify(data)) },
//     props: { data: allPage.data },
//   };
// }
