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
import { useAuth0 } from "@auth0/auth0-react";

const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { logout } = useAuth0();

  return (
    <>
      <Button
        ref={btnRef}
        bg={"transparent"}
        onClick={onOpen}
        sx={{
          "&:hover": {
            backgroundColor: "#F0ECF7",
          },
        }}
      >
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
            <Button as={Link} to="/home" w="100%" mb={2}>
              Matches
            </Button>
            <Button as={Link} to="/email-generator" w="100%" mb={2}>
              Email Templates
            </Button>
            <Button as={Link} to="/profile" w="100%" mb={2}>
              Profile
            </Button>
            <Button variant="outline" w="100%" colorScheme="brand" onClick={() => logout()}>
              Log out
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
