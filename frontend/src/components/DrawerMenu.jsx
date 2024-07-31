import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} bg={"transparent"} colorScheme="brand" onClick={onOpen}>
        <img
          src="/assets/OKTherapy.png"
          alt="Logo"
          style={{ height: 20, cursor: "pointer" }}
        />
      </Button>
      <Drawer
        isOpen={isOpen}
        colorScheme="brand"
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Button as={Link} to="/matches" w="100%" mb={2}>
              Matches
            </Button>
            <Button as={Link} to="/email-generator" w="100%" mb={2}>
              Email Templates
            </Button>
            <Button as={Link} to="/profile" w="100%">
              Profile
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;