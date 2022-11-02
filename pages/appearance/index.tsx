import {
  chakra,
  Container,
  Flex,
  Tab,
  Tabs,
  TabList,
  Spacer,
  HStack,
  Box,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import LayoutDashboard from '../../components/headers/DashboardNavbar';

// pages/main-page.tsx
export default function DashboardPage() {
  return (
    <chakra.h1 fontSize='xl' fontWeight='bold' pt={4} px={8}>
      Appearance
    </chakra.h1>
  );
}

// Here's the spice! (Omit React.ReactElement if use JS)
DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
