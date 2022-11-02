import { chakra } from '@chakra-ui/react';
import LayoutDashboard from '../../components/headers/DashboardNavbar';

import { useSession } from 'next-auth/react';
import CardList from '../../components/pages/CardList';

// pages/main-page.tsx
export default function DashboardPage({ data }: any) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <chakra.main>
      <CardList />
    </chakra.main>
  );
}

// pages/index.tsx
// import prisma from '../../lib/prisma';

// import {
//   GetStaticProps,
//   GetStaticPaths,
//   GetServerSideProps,
//   GetServerSidePropsContext,
// } from 'next';
// import { AddIcon, ArrowForwardIcon, SmallAddIcon } from '@chakra-ui/icons';
// import Link from 'next/link';

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const session = await getSession(ctx);

//   const user = session?.user;

//   const data = await prisma.user.findUnique({
//     where: { email: user?.email || '' },
//     include: {
//       pages: true,
//     },
//   });

//   return {
//     props: { data: JSON.parse(JSON.stringify(data)) },
//   };
// }

// Here's the spice! (Omit React.ReactElement if use JS)
DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
