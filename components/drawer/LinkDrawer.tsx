import {
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import React from 'react';

export default function LinkDrawer(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState('right');

  // console.log('--> Is Open and Close : ');
  // console.log(props?.isOpen);
  // console.log(props?.onClose);

  return (
    <>
      <Drawer placement='left' onClose={props?.onClose} isOpen={props?.isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px' bg='gray.700' color='white'>
            Edit Link
          </DrawerHeader>
          <DrawerBody>
            <p>{props?.data?.link_title}</p>
            <p>{props?.data?.url}</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
