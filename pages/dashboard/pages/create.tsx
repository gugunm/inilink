import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  chakra,
  useToast,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import LayoutDashboard from '../../../components/headers/DashboardNavbar';
import CardList from '../../../components/pages/CardList';

import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function CreatePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    pid: '',
  });

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const pidRef = useRef(null);

  const router = useRouter();

  const handleSubmit = () => {
    axios
      .post('/api/pages/create', { ...formData, email: session?.user?.email })
      .then(function (response) {
        // console.log(response);
        toast({
          title: 'Page Creeated',
          description: "We've your new page",
          status: 'success',
          variant: 'subtle',
          duration: 3000,
          isClosable: true,
        });
        router.push('/dashboard');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Modal
        initialFocusRef={titleRef}
        finalFocusRef={pidRef}
        isOpen={true}
        onClose={() => router.back()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Page</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={titleRef}
                placeholder='Page title'
                value={formData.title}
                onChange={handleChange}
                name='title'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                ref={descRef}
                placeholder='Page description'
                value={formData.desc}
                onChange={handleChange}
                name='desc'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Page ID</FormLabel>
              <Input
                ref={pidRef}
                placeholder='http://inilink.vercel.app/<unique_page_id>'
                value={formData.pid}
                onChange={handleChange}
                name='pid'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={() => router.back()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// Here's the spice! (Omit React.ReactElement if use JS)
CreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutDashboard>
      <CardList />
      {page}
    </LayoutDashboard>
  );
};
